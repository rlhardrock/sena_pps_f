import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {
    // Verificar si ya hay una sesión activa
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['/dashboard']);
    }
  }

  // Prevenir pegar en el campo de contraseña
  onPasswordPaste(event: ClipboardEvent) {
    event.preventDefault();
    this.errorMessage = 'No se permite pegar contraseñas por seguridad';
    setTimeout(() => this.errorMessage = '', 3000); // Limpiar mensaje después de 3 segundos
  }

  login() {
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.';
        } else {
          this.errorMessage = 'Error al iniciar sesión. Por favor, intenta de nuevo más tarde.';
        }
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
