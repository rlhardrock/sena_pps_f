import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BENEFICIOS_ROUTES } from '../beneficios/beneficios.routes';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  ...BENEFICIOS_ROUTES // Integrar las rutas de beneficios aquí
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }