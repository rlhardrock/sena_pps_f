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
    return this.http
      .post(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en login:', error);
    let errorMessage = 'Error desconocido. Intenta nuevamente.';

    if (error.status === 401) {
      errorMessage = 'Credenciales incorrectas.';
    } else if (error.status === 500) {
      errorMessage = 'Error en el servidor. Intenta más tarde.';
    }

    return throwError(() => new Error(errorMessage));
  }
}
