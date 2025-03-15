import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { authGuard } from '../../app/auth/auth.guard';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'new',
    component: UserFormComponent,
    canActivate: [authGuard]
  },
  {
    path: ':id',
    component: UserFormComponent,
    canActivate: [authGuard]
  }
];
