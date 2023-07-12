import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const service = inject(AuthService);

  if (service.isLoggedIn() === false) {
    router.navigate(['/auth/sign-in']);
    return false;
  } else {
    return true;
  }
};
