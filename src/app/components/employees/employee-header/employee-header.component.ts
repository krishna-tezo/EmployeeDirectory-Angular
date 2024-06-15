import { Component } from '@angular/core';
import Employee from '../../../models/employee';
import { DisplayDataService } from '../../../states/display-data.service';
import { ExportCSVService } from '../../../services/export-csv.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-header',
  standalone: true,
  imports: [],
  templateUrl: './employee-header.component.html',
  styleUrl: './employee-header.component.css'
})
export class EmployeeHeaderComponent {

  employees : Employee[] = [];

  constructor(private displayDataService: DisplayDataService, private csvService: ExportCSVService, private route:ActivatedRoute){
   
  }
  ngOnInit(){
    this.displayDataService.employeeDisplayDataObserver.subscribe(data=> this.employees = data);
  }

  //Table To CSV
  csvData = "";
  exportToCSV() {

    this.csvData = this.csvService.extractHeadersForCSV(this.csvData, this.employees);
    this.csvData = this.csvService.extractEmployeeData(this.csvData,this.employees);
    this.csvService.generateCSVFile(this.csvData);
  }
}
