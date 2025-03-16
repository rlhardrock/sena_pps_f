// Asegurarse de que las rutas de beneficios estén correctamente configuradas.
import { Routes } from '@angular/router';
import { BeneficioListComponent } from './beneficio-list/beneficio-list.component';
import { BeneficioFormComponent } from './beneficio-form/beneficio-form.component';

export const BENEFICIOS_ROUTES: Routes = [
  { 
    path: '', 
    component: BeneficioListComponent 
  },
  // Ruta para crear un nuevo beneficio
  { path: 'nuevo', component: BeneficioFormComponent },
  { 
    path: 'editar/:id_remision', 
    component: BeneficioFormComponent 
  }
];
