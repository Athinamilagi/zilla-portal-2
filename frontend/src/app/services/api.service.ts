import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  // Login Service
  login(vendorId: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { vendorId, password });
  }

  // RFQ Services
  getRFQs(vendorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/rfq/vendor/${vendorId}`);
  }

  // PO Services
  getPOs(vendorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/po/vendor/${vendorId}`);
  }

  getPODetails(poId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/po/${poId}`);
  }

  // Goods Services
  getGoodsReceipts(vendorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/goods/vendor/${vendorId}`);
  }

  // Aging Services
  getAgingData(vendorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/aging/${vendorId}`);
  }

  // Invoice Front Services
  getInvoiceFront(vendorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoicefront/${vendorId}`);
  }

  // Invoice Back Services
  getInvoiceBack(belnr: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoiceback/${belnr}`);
  }

  downloadInvoicePdf(belnr: string, lifnr: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/pdf/${belnr}/${lifnr}`, {
      responseType: 'blob'
    });
  }

  // Credit Services
  getCreditInfo(vendorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/credit/${vendorId}`);
  }

  // Profile Services
  getProfile(vendorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile/${vendorId}`);
  }

  getRFQDetails(rfqId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/rfq/${rfqId}`);
  }

  getInvoicePDF(belnr:string, lifnr:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/pdf/${belnr}/${lifnr}`);
  }

} 