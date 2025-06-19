import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class DashboardComponent implements OnInit {
  dashboardData: any = {
    rfqCount: 0,
    poCount: 0,
    goodsCount: 0,
    invoiceCount: 0,
    totalOutstanding: 0,
    recentActivities: []
  };
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: ApiService, private location: Location) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;
    const vendorId = localStorage.getItem('userId');
    
    if (!vendorId) {
      this.error = 'Vendor ID not found. Please login again.';
      this.loading = false;
      return;
    }

    // Load all necessary data for the dashboard
    Promise.all([
      this.apiService.getRFQs(vendorId).toPromise(),
      this.apiService.getPOs(vendorId).toPromise(),
      this.apiService.getGoodsReceipts(vendorId).toPromise(),
      this.apiService.getInvoiceFront(vendorId).toPromise(),
      this.apiService.getAgingData(vendorId).toPromise()
    ]).then(([rfqs, pos, goods, invoices, aging]) => {
      this.dashboardData = {
        rfqCount: rfqs?.length || 0,
        poCount: pos?.length || 0,
        goodsCount: goods?.length || 0,
        invoiceCount: invoices?.length || 0,
        totalOutstanding: aging?.totalOutstanding || 0,
        recentActivities: this.getRecentActivities(rfqs, pos, goods, invoices)
      };
      this.loading = false;
    }).catch(error => {
      this.error = error.error.message || 'Failed to load dashboard data';
      this.loading = false;
    });
  }

  private getRecentActivities(rfqs: any[], pos: any[], goods: any[], invoices: any[]): any[] {
    const activities = [
      ...rfqs.map(rfq => ({ ...rfq, type: 'RFQ', date: new Date(rfq.date) })),
      ...pos.map(po => ({ ...po, type: 'PO', date: new Date(po.date) })),
      ...goods.map(g => ({ ...g, type: 'Goods', date: new Date(g.date) })),
      ...invoices.map(inv => ({ ...inv, type: 'Invoice', date: new Date(inv.date) }))
    ];

    return activities
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);
  }

  goBack(): void {
    this.location.back();
  }
} 