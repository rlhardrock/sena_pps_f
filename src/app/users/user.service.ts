import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
     providedIn: 'root'
})
export class UserService {
     private apiUrl = environment.apiUrl; // Reemplaza con la URL de tu API

     constructor(private http: HttpClient) { }

     saveUser(userData: any): Observable<any> {
          return this.http.post(this.apiUrl, userData);
     }
}
