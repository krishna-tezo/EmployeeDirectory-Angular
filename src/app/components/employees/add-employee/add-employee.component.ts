import { Component, OnInit } from '@angular/core';
import Employee from '../../../models/employee';
import Role from '../../../models/role';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmployeeDataService } from '../../../services/employee-data-service';
import { RoleDataService } from '../../../services/role-data.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employees: Employee[] = [];
  employee:Employee|null = null;
  roles: Role[] = [];
  department: string[] = [];
  location: string[] = [];
  newEmployeeId: string = "";

  constructor(private router: Router, private employeeDataService: EmployeeDataService, private roleDataService:RoleDataService, private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.employeeDataService.employees$.subscribe(data => {
      this.employees = data;
      
      if(this.isViewEmployeePage()){
        let id: string | null = this.activeRoute.snapshot.paramMap.get('id');
        if(id!=null){
          this.employeeDataService.employee(id).subscribe(data => this.employee=data);
        }

      }
      else{
        this.newEmployeeId = this.getNewId();
      }
    });

    // this.roleDataService.roles$.subscribe((data) => {
    //   this.rolesData = data;
    //   this.locations = this.getLocations(this.rolesData);
    //   this.departments = this.getDepartments(this.rolesData);
    // });
  }
  
  isViewEmployeePage(){
    return this.router.url.includes("TEZ");
  }

  getNewId() {
    if (this.employees.length === 0) {
      return "TEZ00001";
    }
    const lastIdNumber = this.employees
      .map(employee => parseInt(employee.id.slice(3), 10))
      .reduce((max, current) => current > max ? current : max, 0);
   
    const newIdNumber = lastIdNumber + 1;
    const newIdString = newIdNumber.toString().padStart(5, '0');
    return `TEZ${newIdString}`;
  }
}
