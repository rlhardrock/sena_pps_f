import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeneficiosService } from '../beneficios.service';
import { Beneficio } from '../beneficio.model'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-beneficio-resumen',
  templateUrl: './beneficio-resumen.component.html',
})
export class BeneficioResumenComponent implements OnInit {
  beneficio: Beneficio | undefined; // Cambia el tipo según tu modelo de beneficio

  constructor(private router: Router, private beneficiosService: BeneficiosService) {}

  ngOnInit() {
    this.getBeneficioResumen();
  }

  getBeneficioResumen() {
    this.beneficiosService.getBeneficio().subscribe(data => {
      this.beneficio = data; 
    });
  }

  goToBeneficioList() {
    this.router.navigate(['/beneficios/list']);
  }
}
