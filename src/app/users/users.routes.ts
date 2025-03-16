// Asegurarse de que las rutas de usuarios estén correctamente configuradas.
import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

// Guard de autenticación eliminado.

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  // Ruta para crear un nuevo usuario
  { path: 'new', component: UserFormComponent },
  {
    path: ':id',
    component: UserFormComponent
  }
];
