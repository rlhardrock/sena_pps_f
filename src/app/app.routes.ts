import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

// Rutas de autenticación eliminadas.

export const routes: Routes = [
  // Ruta para redirigir a dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, 
  // Ruta para el dashboard
  { path: 'dashboard', component: DashboardComponent },

  // Rutas para beneficios
  { path: 'beneficio', loadComponent: () => import('./beneficios/beneficio-list/beneficio-list.component').then(m => m.BeneficioListComponent) }, // Carga el formulario
  { path: 'beneficio/nuevo', loadComponent: () => import('./beneficios/beneficio-form/beneficio-form.component').then(m => m.BeneficioFormComponent) }, // Carga el formulario
  { path: 'beneficio/editar/:id_remision', loadComponent: () => import('./beneficios/beneficio-form/beneficio-form.component').then(m => m.BeneficioFormComponent) }, // Carga el formulario

  // Rutas para usuarios
  { path: 'user', loadComponent: () => import('./users/user-list/user-list.component').then(m => m.UserListComponent) }, // Carga el formulario
  { path: 'user/nuevo', loadComponent: () => import('./users/user-form/user-form.component').then(m => m.UserFormComponent) }, // Carga el formulario
  { path: 'user/editar/:id', loadComponent: () => import('./users/user-form/user-form.component').then(m => m.UserFormComponent) }, // Carga el formulario

  // Rutas para extras
  /* { path: 'extra', loadComponent: () => import('./extras/extra-list.component').then(m => m.ExtraListComponent) }, // Carga el formulario
  { path: 'extra/nuevo', loadComponent: () => import('./extras/extra-form.component').then(m => m.ExtraFormComponent) }, // Carga el formulario
  { path: 'extra/editar/:id', loadComponent: () => import('./extras/extra-form.component').then(m => m.ExtraFormComponent) }, // Carga el formulario */

  { path: '**', redirectTo: '/dashboard' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {}
