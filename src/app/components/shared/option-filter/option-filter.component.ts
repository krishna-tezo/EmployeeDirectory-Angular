import { Component, OnInit } from '@angular/core';
import { EmployeeFilter } from '../../../models/employeeFilter';
import { FilterService } from '../../../services/filter.service';
import Employee from '../../../models/employee';
import { DisplayDataService } from '../../../states/display-data.service';
import { SelectedFiltersService } from '../../../states/selected-filters.service';
import Role from '../../../models/role';
import { RoleDataService } from '../../../services/role-data.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-option-filter',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './option-filter.component.html',
  styleUrls: ['./option-filter.component.css'], // Ensure this is plural: styleUrls
})
export class OptionFilterComponent implements OnInit {

  selectedEmployeeFilter: EmployeeFilter = new EmployeeFilter([], [], [], []);
  displayData: Employee[] = [];
  rolesData: Role[] = [];
  locations: string[] = [];
  departments:string[] = [];

  constructor(
    private displayDataService: DisplayDataService, 
    private selectedFilterService: SelectedFiltersService, 
    private filterService: FilterService, 
    private roleDataService: RoleDataService,
    private route: Router,
  ) {}

  ngOnInit() {
    this.selectedFilterService.selectedFilterList.subscribe(data => this.selectedEmployeeFilter = data);
    this.displayDataService.employeeDisplayDataObserver.subscribe(data => this.displayData = data);
    this.roleDataService.roles$.subscribe(data => {
      this.rolesData = data;
      this.locations = this.getLocations(this.rolesData);
      this.departments = this.getDepartments(this.rolesData);
    });
  }

  isRolesPage(){
    return this.route.url.includes('roles');
  }

  getLocations(rolesData: Role[]): string[] {
    return [...new Set(rolesData.map(role => role.location))];
  }
  getDepartments(rolesData: Role[]): string[] {
    return [...new Set(rolesData.map(role => role.department))];
  }

  manageEmployeeFilter(event:Event) {
    let element = event.target as HTMLDivElement;
    let criteria: string = element.classList[1];
    this.selectedEmployeeFilter = this.filterService.manageSelectedFilterOptions(
      element,
      this.selectedEmployeeFilter,
      criteria
    ) as EmployeeFilter;
    element.classList.toggle("active");

    if (criteria == "selectedAlphabets") {
      let removeFilterBtn = document.querySelector(
        ".remove-filter-btn"
      ) as HTMLImageElement;
      removeFilterBtn.src = "../../assets/interface/filter_red.svg";
      this.displayData = this.filterService.applyFilter(
        this.selectedEmployeeFilter,
        this.displayData
      );

      this.displayDataService.set(this.displayData);
    } else {
      this.filterService.toggleFilterApplyButtons(this.selectedEmployeeFilter);
    }
  }

  // Show filter Dropdowns
  showFilterDropdown(currFilterOption: HTMLDivElement) {
    currFilterOption.nextElementSibling!.classList.toggle('active');
    const dropDownBtnIcon = currFilterOption.children[0].children[1];
    dropDownBtnIcon.classList.toggle('active');
    this.toggleFilterApplyButtons(this.selectedEmployeeFilter);
  }

  toggleFilterApplyButtons(selectedFilter: any) {
    let isOptionFilterApplied = false;
    Object.keys(selectedFilter).forEach((type) => {
      if (
        type != 'selectedAlphabets' &&
        selectedFilter[type as keyof EmployeeFilter].length > 0
      ) {
        isOptionFilterApplied = true;
      }
    });
    const btnReset = document.querySelector(
      '.filter-options-reset'
    ) as HTMLButtonElement;
    const btnApply = document.querySelector(
      '.filter-options-apply'
    ) as HTMLButtonElement;
    let show = 'inline-block';
    let hide = 'none';
    if (isOptionFilterApplied) {
      btnReset.style.display = show;
      btnApply.style.display = show;
    }
  }

  manageApplyFilterBtn() {
    this.displayData = this.filterService.applyFilter(this.selectedEmployeeFilter, this.displayData);
    this.displayDataService.set(this.displayData);
  }

  manageResetFilterBtn() {
    this.displayData = this.filterService.resetFilter(this.selectedEmployeeFilter, this.displayData);
    this.displayDataService.set(this.displayData);
  }
}
