import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.DashboardRoutingModule)
  },
  { 
    path: 'beneficios',
    loadChildren: () => import('./beneficios/beneficios.routes').then(m => m.BENEFICIOS_ROUTES)
  },
  { 
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {}
