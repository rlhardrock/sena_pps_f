import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Beneficio } from "./beneficio.model";

@Injectable({
  providedIn: 'root'
})
export class BeneficiosService {
  private apiUrl = `${environment.apiUrl}/beneficio`;

  constructor(private http: HttpClient) { }

  // Obtener todos los beneficio
  getAllBeneficios(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  /* getBeneficio(): Observable<Beneficio> {
    return this.http.get<Beneficio>(`${this.apiUrl}`);
  } */

  // Obtener beneficios paginados
  getBeneficiosPaginados(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  /* listarTodosLosBeneficios(page: number = 1, limit: number = 10): Observable<Beneficio[]> {
    return this.http.get<Beneficio[]>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  } */

  // Obtener todas las remisiones
  getRemisiones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/remisiones`);
  }

  /* listarTodasLasRemisiones(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/remisiones`);
  } */

  // Obtener remisiones por empresa
  getRemisionesPorEmpresa(id_empresa: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/empresas`, { params: { id_empresa } });
  }

  /* listarRemisionesPorEmpresa(id_empresa: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/empresas?id_empresa=${id_empresa}`);
  } */

  // Obtener un beneficio por id_remision
  getBeneficioPorRemision(id_remision: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id_remision}`);
  }

  /* obtenerBeneficioPorRemision(id_remision: string): Observable<Beneficio> {
    return this.http.get<Beneficio>(`${this.apiUrl}/${id_remision}`);
  } */

  // Crear un nuevo beneficio
  createBeneficio(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  /* crearBeneficio(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  } */

  // Actualizar un beneficio existente
  updateBeneficio(id_remision: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id_remision}`, data);
  }

  /* actualizarBeneficio(id_remision: string, beneficio: Partial<Beneficio>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id_remision}`, beneficio);
  } */

}
