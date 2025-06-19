import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);
  const userId = localStorage.getItem('userId');
  console.log(userId)
  if (userId) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
}; 