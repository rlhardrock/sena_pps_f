import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beneficio-resumen',
  templateUrl: './beneficio-resumen.component.html',
})
export class BeneficioResumenComponent {
  constructor(private router: Router) {}

  goToBeneficioList() {
    this.router.navigate(['/beneficios/list']);
  }
}
