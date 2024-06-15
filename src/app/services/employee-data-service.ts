import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Employee from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDataService {
  
  employees$: Observable<Employee[]>;
  constructor(private http: HttpClient) {
    this.employees$ = this.http.get<Employee[]>('https://localhost:7216/Employee/GetEmployees');
  }
}