import { Component } from '@angular/core';
import { BeneficiosService } from './beneficios.service';

@Component({
     selector: 'app-beneficios',
     templateUrl: './beneficios.component.html',
     styleUrls: []
})
export class BeneficiosComponent {
     // ...existing code...

     constructor(private beneficiosService: BeneficiosService) { }

     // ...existing code...

     buscarBeneficio() {
          const idRemision = prompt('Ingrese el ID de Remisión:');
          if (idRemision) {
               this.beneficiosService.obtenerBeneficioPorRemision(idRemision).subscribe(
                    beneficio => {
                         console.log('Beneficio encontrado:', beneficio);
                         // Aquí puedes agregar lógica para mostrar el beneficio encontrado en la UI
                    },
                    error => {
                         console.error('Error al buscar el beneficio:', error);
                    }
               );
          }
     }
}