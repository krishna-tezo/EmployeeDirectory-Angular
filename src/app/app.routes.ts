import { Routes } from '@angular/router';
import { EmployeeMainComponent } from './components/employees/employee-main/employee-main.component';
import { RoleMainComponent } from './components/roles/role-main/role-main.component';
import { RoleDetailsComponent } from './components/roles/role-details/role-details.component';

export const routes: Routes = [
  { path: 'employees', component: EmployeeMainComponent },
  { path: 'roles', component: RoleMainComponent },
  { path: 'roleDetails/:id', component: RoleDetailsComponent },
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
];
