import { Component,OnDestroy,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true
})
export class NavigationComponent implements OnInit, OnDestroy{
  userId: string | null = null;
  private routerSubscription: Subscription;
  menuItems = [
    { path: '/rfq', icon: 'fas fa-file-alt', label: 'RFQs' },
    { path: '/po', icon: 'fas fa-shopping-cart', label: 'Purchase Orders' },
    { path: '/gr', icon: 'fas fa-truck', label: 'Goods Receipts' },
    { path: '/aging', icon: 'fas fa-clock', label: 'Aging Analysis' },
    { path: '/invoice-front', icon: 'fas fa-file-invoice', label: 'Front Office Invoices' },
    { path: '/credit-info', icon: 'fas fa-credit-card', label: 'Credit Information' },
    { path: '/profile', icon: 'fas fa-user', label: 'Profile' }
  ];

  constructor(private router: Router) {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateVendorId();
    });
  }

  ngOnInit(): void {
    this.updateVendorId();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private updateVendorId(): void {
    this.userId = localStorage.getItem('userId');
    if (!this.userId && this.router.url !== '/login') {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    localStorage.removeItem('userId');
    this.userId = null;
    this.router.navigate(['/login']);
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }
} 