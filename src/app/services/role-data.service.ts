import { Injectable } from '@angular/core';
import Role from '../models/role';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleDataService {

 
  
 roles$: Observable<Role[]>;
  constructor(private http: HttpClient) {
    this.roles$ = this.http.get<Role[]>('https://localhost:7216/Role/GetRoles');
  }
}
