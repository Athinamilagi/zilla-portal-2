import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-aging',
  templateUrl: './aging.component.html',
  styleUrls: ['./aging.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class AgingComponent implements OnInit {
  public agingDataList: any[] = [];
  public agingData: any = null;
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: ApiService, private location: Location) {}

  ngOnInit(): void {
    this.loadAgingData();
  }

  loadAgingData(): void {
    this.loading = true;
    this.error = '';
    const vendorId = localStorage.getItem('userId');
    if (!vendorId) {
      this.error = 'Vendor ID not found';
      this.loading = false;
      return;
    }
    this.apiService.getAgingData(vendorId).subscribe({
      next: (response) => {
        this.agingDataList = response?.data?.results || [];
        this.agingData = this.agingDataList[0] || null;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
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