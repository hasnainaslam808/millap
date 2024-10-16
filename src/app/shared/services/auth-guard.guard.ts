// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service'; // Adjust the path as necessary
import { map, tap } from 'rxjs/operators';
import { AuthGaurdService } from './auth-gaurd.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Injecting Router
  const authService = inject(AuthGaurdService); // Injecting AuthService

  return authService.userId$.pipe(
    map((userId) => {
      if (!userId) {
        // If userId is not found, navigate to the login page
        router.navigate(['/log-in']);
        return false; // Prevent access to the protected route
      }
      return true; // Allow access to the protected route
    })
  );
};
