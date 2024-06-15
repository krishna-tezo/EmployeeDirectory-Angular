import { Injectable } from '@angular/core';
import { EmployeeFilter } from '../models/employeeFilter';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedFiltersService {

  selectedFilter = new EmployeeFilter([],[],[],[]);
  selectedFilterSubject = new BehaviorSubject<EmployeeFilter>(this.selectedFilter);
  constructor() {
    
  }

  get selectedFilterList(): Observable<EmployeeFilter> {
    return this.selectedFilterSubject.asObservable();
  }


  set(newSelectedFilter: EmployeeFilter) {
    this.selectedFilterSubject.next(newSelectedFilter);
  }
}