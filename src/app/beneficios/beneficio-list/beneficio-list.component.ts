import { Component, OnInit } from '@angular/core';
import { BeneficiosService } from "../beneficios.service";
import { Beneficio } from "../beneficio.model";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-beneficio-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './beneficio-list.component.html',
  styleUrls: [],
})

export class BeneficioListComponent implements OnInit {
  beneficios: Beneficio[] = [];
  selectedBeneficio: Beneficio | null = null;
  idRemision: string = ''; // Nueva propiedad para el ID de Remisión

  constructor(private beneficiosService: BeneficiosService, private router: Router) { }
  ngOnInit() {
    this.beneficiosService.getAllBeneficios().subscribe(data => {
      this.beneficios = data;
    });
  }

  selectBeneficio(beneficio: Beneficio) {
    this.selectedBeneficio = { ...beneficio };
  }

  updateBeneficio() {
    if (this.selectedBeneficio) {
      this.beneficiosService.updateBeneficio(this.selectedBeneficio.id_remision, this.selectedBeneficio)
        .subscribe(() => {
          this.loadBeneficios(); // Refrescar la lista
          this.selectedBeneficio = null; // Cerrar el modal
        });
    }
  }

  loadBeneficios() {
    this.beneficiosService.getAllBeneficios().subscribe(data => {
      this.beneficios = data;
    });
  }

  closeModal() {
    this.selectedBeneficio = null;
  }

  crearNuevoBeneficio() {
    this.router.navigate(['/beneficio/nuevo']);
  }

  buscarBeneficio() {
    if (this.idRemision) {
      this.beneficiosService.getBeneficioPorRemision(this.idRemision).subscribe(
        beneficio => {
          console.log('Beneficio encontrado:', beneficio);
          // Aquí puedes agregar lógica para mostrar el beneficio encontrado en la UI
        },
        error => {
          console.error('Error al buscar el beneficio:', error);
        }
      );
    } else {
      alert('Por favor, ingrese un ID de Remisión.');
    }
  }
}
