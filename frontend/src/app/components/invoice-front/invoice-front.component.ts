import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

interface Invoice {
  Belnr: string;    // Invoice Number
  Blart: string;    // Document Type
  Bldat: string;    // Document Date
  Budat: string;    // Posting Date
  Gjahr: string;    // Fiscal Year
  Lifnr: string;    // Vendor ID
  Rmwwr: string;    // Amount
  Waers: string;    // Currency
  Wmwst1: string;   // Tax Amount
  Zfbdt: string;    // Due Date
}

interface ApiResponse {
  data: {
    results: Invoice | Invoice[];
  };
}

@Component({
  selector: 'app-invoice-front',
  templateUrl: './invoice-front.component.html',
  styleUrls: ['./invoice-front.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class InvoiceFrontComponent implements OnInit {
  invoices: Invoice[] = [];
  selectedInvoice: any = null;
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: ApiService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices() {
    this.loading = true;
    const vendorId = localStorage.getItem('userId');

    if (!vendorId) {
      this.error = 'Vendor ID not found. Please login again.';
      this.loading = false;
      return;
    }

    this.apiService.getInvoiceFront(vendorId).subscribe({
      next: (data: ApiResponse) => {
        this.invoices = Array.isArray(data.data.results) ? data.data.results : [data.data.results];
        this.loading = false;
      },
      error: (error: any) => {
        this.error = error.error.message || 'Failed to load invoices';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    // Remove "/Date(" and ")/" and convert to number
    const timestamp = parseInt(dateString.replace(/[^0-9]/g, ''));
    return new Date(timestamp).toLocaleDateString();
  }

  viewInvoiceDetails(invoiceId: string) {
    this.loading = true;
    this.apiService.getInvoiceFront(invoiceId).subscribe({
      next: (response) => {
        this.selectedInvoice = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error.message || 'Failed to load Invoice details';
        this.loading = false;
      }
    });
  }

  closeInvoiceDetails() {
    this.selectedInvoice = null;
  }

  navigateToInvoiceBack(belnr: string, lifnr: string): void {
    this.router.navigate(['/invoice-back', belnr, lifnr]);
  }
} 