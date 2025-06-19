import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  standalone: true
})
export class ProfileComponent implements OnInit {
  public profile: any = null;
  profileForm: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.profileForm = this.fb.group({
      companyName: ['', Validators.required],
      contactPerson: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      taxId: ['', Validators.required],
      bankDetails: this.fb.group({
        accountName: ['', Validators.required],
        accountNumber: ['', Validators.required],
        bankName: ['', Validators.required],
        swiftCode: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.error = null;
    const vendorId = localStorage.getItem('userId');

    if (!vendorId) {
      this.error = 'Vendor ID not found';
      this.loading = false;
      return;
    }

    this.apiService.getProfile(vendorId).subscribe({
      next: (response) => {
        this.profile = response?.data?.d;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
} 