// src/app/guards/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

export const authGuard: CanActivateFn = () => {
  const auth = getAuth();
  setPersistence(auth, browserLocalPersistence);
  const router = inject(Router);

  // Checagem imediata do usuário
  if (auth.currentUser) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
