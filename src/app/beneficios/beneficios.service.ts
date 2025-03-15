import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Beneficio} from "./beneficio.model";

@Injectable({
  providedIn: 'root'
})
export class BeneficiosService {
  private apiUrl = `${environment.apiUrl}/beneficio`;

  constructor(private http: HttpClient) {}

  crearBeneficio(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  listarTodasLasRemisiones(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/remisiones`);
  }

  listarTodosLosBeneficios(page: number = 1, limit: number = 10): Observable<Beneficio[]> {
    return this.http.get<Beneficio[]>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  obtenerBeneficioPorRemision(id_remision: string): Observable<Beneficio> {
    return this.http.get<Beneficio>(`${this.apiUrl}/${id_remision}`);
  }

  listarRemisionesPorEmpresa(id_empresa: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/empresas?id_empresa=${id_empresa}`);
  }

  actualizarBeneficio(id_remision: string, beneficio: Partial<Beneficio>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id_remision}`, beneficio);
  }

}
