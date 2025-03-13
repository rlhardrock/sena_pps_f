import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BeneficioFormComponent } from './beneficios/beneficio-form/beneficio-form.component';
import { BeneficioListComponent } from './beneficios/beneficio-list/beneficio-list.component';
import { DashboardComponent } from "./dashboard/dashboard.component";

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'beneficios', component: BeneficioListComponent },
  { path: 'beneficio/nuevo', component: BeneficioFormComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {}
