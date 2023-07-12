import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

/**
 * A guard that checks if the user is authenticated before allowing access to a route.
 * If the user is not authenticated, they will be redirected to the sign-in page.
 * @returns A boolean indicating whether the user is authenticated or not.
 */
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
