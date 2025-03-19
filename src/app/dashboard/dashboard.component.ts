import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: [],
})

export class DashboardComponent {
  user: any;

  constructor(private router: Router) {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      this.router.navigate(['/']); // Redirigir a login si no hay usuario
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]); // Redirige a la ruta especificada
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
