import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl text-center">

        <h2 class="text-3xl font-bold text-gray-800 mb-4">Dashboard</h2>
        <p class="text-gray-600 mb-6">Bienvenido, <span class="font-bold">{{ user?.email || 'Usuario' }}</span></p>

        <!-- Botones principales -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition transform hover:scale-105"
            (click)="navigateTo('beneficio')"
            aria-label="Ir a Beneficio">
            📊 Beneficio
          </button>

          <button
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
            (click)="navigateTo('area-sucia')"
            aria-label="Ir a Área Sucia">
            🏭 Área Sucia
          </button>

          <button
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition transform hover:scale-105"
            (click)="navigateTo('area-limpia')"
            aria-label="Ir a Área Limpia">
            🚛 Área Limpia
          </button>
        </div>

        <!-- Cerrar sesión -->
        <div class="mt-6">
          <button
            (click)="logout()"
            class="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition transform hover:scale-105"
            aria-label="Cerrar sesión">
            🔴 Cerrar Sesión
          </button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .min-h-screen { min-height: 100vh; }
    .shadow-lg { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
  `]
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
    this.router.navigate(['/login']);
  }
}
