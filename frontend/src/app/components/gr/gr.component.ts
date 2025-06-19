import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gr',
  templateUrl: './gr.component.html',
  styleUrls: ['./gr.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class GRComponent implements OnInit {
  goodsReceipts: any[] = [];
  selectedGR: any = null;
  loading = false;
  error: string | null = null;

  constructor(private apiService: ApiService, private location: Location) {}

  ngOnInit(): void {
    this.loadGoodsReceipts();
  }

  loadGoodsReceipts(): void {
    this.loading = true;
    this.error = null;
    const vendorId = localStorage.getItem('userId');

    if (!vendorId) {
      this.error = 'Vendor ID not found';
      this.loading = false;
      return;
    }

    this.apiService.getGoodsReceipts(vendorId).subscribe({
      next: (data) => {
        this.goodsReceipts = data.results;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load goods receipts';
        this.loading = false;
        console.error('Error loading goods receipts:', error);
      }
    });
  }

  viewGRDetails(gr: any): void {
    this.selectedGR = gr;
  }

  closeGRDetails(): void {
    this.selectedGR = null;
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

  goBack(): void {
    this.location.back();
  }
} 