import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../auth.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/dashboard']); // Redirige al dashboard
      },
      error: () => {
        this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo.';
      }
    });
  }
}
