import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      vendorId: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { vendorId, password } = this.loginForm.value;
      this.apiService.login(vendorId, password).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            localStorage.setItem('userId', response.userId);
            this.router.navigate(['/profile']);
          }
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Login failed. Please try again.';
        }
      });
    }
  }
} 