import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
  goodsReceipts: any[] = [];
  selectedGoods: any = null;
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: ApiService, private location: Location) {}

  ngOnInit() {
    this.loadGoodsReceipts();
  }

  loadGoodsReceipts() {
    this.loading = true;
    const vendorId = localStorage.getItem('userId');
    
    if (!vendorId) {
      this.error = 'Vendor ID not found. Please login again.';
      this.loading = false;
      return;
    }

    this.apiService.getGoodsReceipts(vendorId).subscribe({
      next: (response) => {
        this.goodsReceipts = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error.message || 'Failed to load Goods Receipts';
        this.loading = false;
      }
    });
  }

  viewGoodsDetails(goodsId: string) {
    this.loading = true;
    this.apiService.getGoodsDetails(goodsId).subscribe({
      next: (response) => {
        this.selectedGoods = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error.message || 'Failed to load Goods details';
        this.loading = false;
      }
    });
  }

  closeGoodsDetails() {
    this.selectedGoods = null;
  }

  goBack(): void {
    this.location.back();
  }
} 