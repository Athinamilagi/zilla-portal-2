import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';

interface CreditInfo {
  Amount: string;
  CompanyCode: string;
  Currency: string;
  DocType: string;
  DocYear: string;
  EntryDate: string;
  MemoDoc: string;
  MemoType: string;
  PostingDate: string;
  ReferenceDocNo: string;
  VendorId: string;
}

@Component({
  selector: 'app-credit-info',
  templateUrl: './credit-info.component.html',
  styleUrls: ['./credit-info.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class CreditInfoComponent implements OnInit {
  creditInfo: CreditInfo[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: ApiService, private location: Location) {}

  ngOnInit() {
    this.loadCreditInfo();
  }

  loadCreditInfo() {
    this.loading = true;
    const vendorId = localStorage.getItem('userId');
    
    if (!vendorId) {
      this.error = 'Vendor ID not found. Please login again.';
      this.loading = false;
      return;
    }

    this.apiService.getCreditInfo(vendorId).subscribe({
      next: (data) => {
        this.creditInfo = Array.isArray(data.data.results) ? data.data.results : [data.data.results];
        console.log('Processed creditInfo:', this.creditInfo);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading credit info:', error);
        this.error = error.error.message || 'Failed to load credit information';
        this.loading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    // Remove "/Date(" and ")/" and convert to number
    const timestamp = parseInt(dateString.replace(/[^0-9]/g, ''));
    return new Date(timestamp).toLocaleDateString();
  }

  goBack(): void {
    this.location.back();
  }
} 