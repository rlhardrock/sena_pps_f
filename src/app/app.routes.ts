import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { 
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { 
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'beneficios',
    loadChildren: () => import('./beneficios/beneficios.routes').then(m => m.BENEFICIOS_ROUTES),
    canActivate: [authGuard]
  },
  { 
    path: 'users',
    loadChildren: () => import('./users/users.routes').then(m => m.USERS_ROUTES),
    canActivate: [authGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {}
