import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface Invoice {
  Belnr: string;
  Bstme: string;
  Gjahr: string;
  Maktx: string;
  Matnr: string;
  Menge: string;
  Waers: string;
  Wrbtr: string;
}

interface ApiResponse {
  data: {
    results: Invoice[];
  }
}

// interface PDFResponse{
// Belnr: string,
// Bstme: string,
// Gjahr: string,
// Maktx: string,
// Matnr: string,
// Menge: string,
// Waers: string,
// Wrbtr: string
// }

@Component({
  selector: 'app-invoice-back',
  templateUrl: './invoice-back.component.html',
  styleUrls: ['./invoice-back.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class InvoiceBackComponent implements OnInit {
  invoices: Invoice | null = null;
  selectedInvoice: Invoice | null = null;
  loading = false;
  downloading = false;
  error: string | null = null;
  belnr: string = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const belnr = params['belnr'];
      this.belnr = belnr;
      if (belnr) {
        this.loadInvoiceByBelnr(belnr);
      }
    });
  }

  loadInvoiceByBelnr(belnr: string): void {
    this.loading = true;
    this.error = null;

    this.apiService.getInvoiceBack(belnr).subscribe({
      next: (data: ApiResponse) => {
        this.invoices = data.data.results[0];
        this.loading = false;
      },
      error: (error: Error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  viewInvoiceDetails(): void {
    this.downloading = true;
    const lifnr = localStorage.getItem('userId') || "0000100000";
    
    this.apiService.downloadInvoicePdf(this.belnr, lifnr).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `invoice_${this.belnr}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        this.downloading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to download invoice';
        this.downloading = false;
      }
    });
  }

  closeInvoiceDetails(): void {
    this.selectedInvoice = null;
  }
} 