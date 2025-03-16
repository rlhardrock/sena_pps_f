import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Usar la variable de entorno para la URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const data = { email, password }; // Crear el objeto con las credenciales
    return this.http.post(`${this.apiUrl}/login`, data, {
      headers: { 'Content-Type': 'application/json' }, // Asegurarse de que el tipo de contenido sea JSON
      withCredentials: true, // Incluir credenciales si es necesario
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en login:', error);
        return throwError(() => 'Error al iniciar sesión. Por favor, verifica tus credenciales e intenta de nuevo.');
      })
    );
  }
}
