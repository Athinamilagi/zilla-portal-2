import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rfq',
  templateUrl: './rfq.component.html',
  styleUrls: ['./rfq.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class RFQComponent implements OnInit {
  rfqs: any[] = [];
  selectedRFQ: any = null;
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: ApiService, private location: Location) { }

  ngOnInit() {
    this.loadRFQs();
  }

  loadRFQs() {
    this.loading = true;
    const vendorId = localStorage.getItem('userId');

    if (!vendorId) {
      this.error = 'Vendor ID not found. Please login again.';
      this.loading = false;
      return;
    }

    this.apiService.getRFQs(vendorId).subscribe({
      next: (response) => {
        this.rfqs = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error.message || 'Failed to load RFQs';
        this.loading = false;
      }
    });
  }

  viewRFQDetails(rfqId: string): void {
    this.loading = true;
    this.apiService.getRFQDetails(rfqId).subscribe({
      next: (response: any) => {
        this.selectedRFQ = response;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
  closeRFQDetails() {
    this.selectedRFQ = null;
  }

  parseSapDate(sapDate: string): string {
    if (!sapDate) return '';
    const match = sapDate.match(/\/Date\((\d+)\)\//);
    if (match) {
      const date = new Date(Number(match[1]));
      return date.toLocaleDateString();
    }
    return sapDate;
  }
} 