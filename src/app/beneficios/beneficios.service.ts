import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Beneficio} from "./beneficio.model";

@Injectable({
  providedIn: 'root'
})
export class BeneficiosService {
  private apiUrl = `${environment.apiUrl}/beneficios`;

  constructor(private http: HttpClient) {}

  crearBeneficio(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  listarTodasLasRemisiones(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/remisiones`);
  }

  listarTodosLosBeneficios(): Observable<Beneficio[]> {
    return this.http.get<Beneficio[]>(this.apiUrl);
  }

  actualizarBeneficio(id_remision: string, beneficio: Beneficio): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id_remision}`, beneficio);
  }

}
