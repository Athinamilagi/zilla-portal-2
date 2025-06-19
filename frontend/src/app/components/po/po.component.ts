import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class POComponent implements OnInit {
  purchaseOrders: any[] = [];
  selectedPO: any = null;
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: ApiService, private location: Location) { }

  ngOnInit() {
    this.loadPOs();
  }

  loadPOs() {
    this.loading = true;
    const vendorId = localStorage.getItem('userId');

    if (!vendorId) {
      this.error = 'Vendor ID not found. Please login again.';
      this.loading = false;
      return;
    }

    this.apiService.getPOs(vendorId).subscribe({
      next: (response) => {
        this.purchaseOrders = response.results;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error.message || 'Failed to load Purchase Orders';
        this.loading = false;
      }
    });
  }

  viewPODetails(poId: string): void {
    this.loading = true;
    this.apiService.getPODetails(poId).subscribe({
      next: (response: any) => {
        this.selectedPO = response;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  closePODetails() {
    this.selectedPO = null;
  }
  goBack(): void {
    this.location.back();
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