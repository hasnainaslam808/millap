import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('userId')
  const router = inject(Router);
  if (!token) {
    router.navigate(['log-in'])
    return false;



  }
  else {

    return true

  }
};
