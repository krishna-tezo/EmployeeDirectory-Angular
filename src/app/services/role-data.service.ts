import { Injectable } from '@angular/core';
import Role from '../models/role';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import Department from '../models/Departments';
import Location from '../models/Location';

@Injectable({
  providedIn: 'root'
})
export class RoleDataService {

  roles$: Observable<Role[]>;
  location$ : Observable<Location[]>;
  departments$ : Observable<Department[]>

  constructor(private http: HttpClient) {
    this.roles$ = this.http.get<Role[]>('https://localhost:7216/Role/GetRoles');

    this.departments$ = this.http.get<Department[]>('https://localhost:7216/Role/GetDepartments');

    this.location$ = this.http.get<Location[]>('https://localhost:7216/Role/GetLocations');
  }
}
