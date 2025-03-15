import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Para rutas protegidas, verificar si hay un usuario autenticado
  const user = localStorage.getItem('user');
  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
