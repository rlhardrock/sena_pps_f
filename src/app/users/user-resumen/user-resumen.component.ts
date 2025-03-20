import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-resumen',
  templateUrl: './user-resumen.component.html',
})
export class UserResumenComponent {
  constructor(private router: Router) {}

  // Aquí puedes agregar métodos para manejar la lógica del resumen si es necesario
  goToUserList() {
    this.router.navigate(['/users/list']);
  }
}
