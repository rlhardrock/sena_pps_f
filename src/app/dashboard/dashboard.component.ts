import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import { BeneficiosService } from '../beneficios/beneficios.service'; // Importación corregida

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: [],
})
export class DashboardComponent {
  user: any;
  beneficios: any[] = []; // Agregado para almacenar los beneficios

  constructor(private router: Router, private beneficiosService: BeneficiosService) { // BeneficiosService agregado al constructor
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      this.router.navigate(['/']); // Redirigir a login si no hay usuario
    }
  }

  ngOnInit() {
    this.beneficiosService.getAllBeneficios().subscribe(
      (data) => {
        this.beneficios = data;
        console.log('Beneficios:', data);
      },
      (error) => console.error('Error al obtener beneficios:', error)
    );
  }

  navigateTo(route: string) {
    this.router.navigate([route]); // Redirige a la ruta especificada
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
