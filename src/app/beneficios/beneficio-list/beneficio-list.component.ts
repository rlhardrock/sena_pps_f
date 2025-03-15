import {Component, OnInit} from '@angular/core';
import {BeneficiosService} from "../beneficios.service";
import {Beneficio} from "../beneficio.model";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

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

  constructor(private beneficiosService: BeneficiosService) {}

  ngOnInit(): void {
    this.loadBeneficios();
  }

  loadBeneficios() {
    this.beneficiosService.listarTodosLosBeneficios().subscribe(data => {
      this.beneficios = data;
    });
  }

  selectBeneficio(beneficio: Beneficio) {
    this.selectedBeneficio = { ...beneficio };
  }

  updateBeneficio() {
    if (this.selectedBeneficio) {
      this.beneficiosService.actualizarBeneficio(this.selectedBeneficio.id_remision, this.selectedBeneficio)
        .subscribe(() => {
          this.loadBeneficios(); // Refrescar la lista
          this.selectedBeneficio = null; // Cerrar el modal
        });
    }
  }

  closeModal() {
    this.selectedBeneficio = null;
  }
}
