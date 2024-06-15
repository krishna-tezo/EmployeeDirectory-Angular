import { Injectable } from '@angular/core';
import Employee from '../models/employee';
import Role from '../models/role';
import { EmployeeFilter } from '../models/employeeFilter';
import { EmployeeDataService } from './employee-data-service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  data: Employee[] = [];
  constructor(private employeeService: EmployeeDataService) {
    employeeService.employees$.subscribe((data) => (this.data = data));
  }
  manageSelectedFilterOptions(
    element: HTMLDivElement,
    selectedFilter: any,
    criteria: string
  ) {
    let filterName = element.textContent!;

    let selectedFilterOptions: string[] = selectedFilter[criteria];

    if (!selectedFilterOptions.includes(filterName)) {
      selectedFilterOptions.push(filterName);
    } else {
      selectedFilterOptions.splice(
        selectedFilterOptions.indexOf(filterName),
        1
      );
    }
    return selectedFilter;
  }

  //Employe Filter
  removeUnfilteredEmployees(
    displayData: Employee[],
    type: String,
    filterOptions: String[]
  ) {
    let tempData: Employee[] = [];

    tempData = displayData.slice();
    let valueToCompare = undefined;

    displayData.forEach((emp) => {
      switch (type) {
        case 'selectedAlphabets':
          valueToCompare = emp.firstName[0];
          break;
        case 'location':
          valueToCompare = emp.location;
          break;
        case 'department':
          valueToCompare = emp.department;
          break;
        default:
          valueToCompare = emp.status;
          break;
      }

      let isMatched = false;
      for (let filterOption of filterOptions) {
        if (valueToCompare == filterOption) {
          isMatched = true;
        }
      }
      if (!isMatched) {
        tempData.splice(tempData.indexOf(emp), 1);
      }
    });
    displayData = tempData.slice();
    return displayData;
  }

  removeUnfilteredRoles(
    displayData: Role[],
    type: String,
    filterOptions: String[]
  ) {
    let tempData: Role[] = displayData.slice();
    let valueToCompare = undefined;

    displayData.forEach((role) => {
      if (type == 'department') {
        valueToCompare = role.department;
      } else {
        valueToCompare = role.location;
      }

      let isMatched = false;
      for (let filterOption of filterOptions) {
        // Current value to the role matches to any of the option filters selected
        if (valueToCompare == filterOption) {
          isMatched = true;
        }
      }
      if (!isMatched) {
        tempData.splice(tempData.indexOf(role), 1);
      }
    });
    displayData = tempData.slice();
    return displayData;
  }

  //Capitalize first letter to display
  capitalizeFirstLetter(word: string) {
    let result = word.charAt(0).toUpperCase() + word.slice(1);
    return result;
  }

  //Common method
  applyFilter(selectedFilter: any, displayData: any) {
    let filterLabels = Array.from(
      document.querySelectorAll('.filter-options-btn p')
    );
    displayData = this.data.slice();
    type selectedFilterType = keyof typeof selectedFilter;

    Object.keys(selectedFilter).forEach((type) => {
      let filterOptions = selectedFilter[type as selectedFilterType];
      for (let label of filterLabels) {
        if (filterOptions.length > 0) {
          if (label.classList[0].toLowerCase() == type) {
            label.textContent = filterOptions.length + ' selected';
          }
          if (Object.keys(selectedFilter).length == 4) {
            displayData = this.removeUnfilteredEmployees(
              displayData,
              type,
              filterOptions
            );
          } else {
            displayData = this.removeUnfilteredRoles(
              displayData,
              type,
              filterOptions
            );
          }
        } else {
          if (label.classList[0].toLowerCase() == type) {
            label.textContent = this.capitalizeFirstLetter(type);
          }
        }
      }
    });
    return displayData;
  }

  // Toggle Filter Apply buttons
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

  // Reset Option Filter
  resetFilter(selectedFilter: any, displayData: any) {
    selectedFilter.status = [];
    selectedFilter.location = [];
    selectedFilter.department = [];

    let filterBtn =
      document.querySelectorAll<HTMLDivElement>('.drop-down-menu');
    let filterLabels = document.querySelectorAll<HTMLParagraphElement>(
      '.filter-options-btn p'
    );

    let applyBtn = document.querySelector<HTMLButtonElement>(
      '.filter-options-apply'
    );
    let resetBtn = document.querySelector<HTMLButtonElement>(
      '.filter-options-reset'
    );

    filterLabels.forEach((fName) => {
      let name = fName.classList[0];
      if (name == 'status') {
        fName.textContent = 'Status';
      } else if (name == 'location') {
        fName.textContent = 'Location';
      } else {
        fName.textContent = 'Department';
      }
    });

    displayData = this.applyFilter(selectedFilter, displayData);

    this.toggleFilterApplyButtons(selectedFilter);

    filterBtn.forEach((btn) => {
      btn.classList.remove('active');
    });

    if (resetBtn) resetBtn.style.display = 'none';
    if (applyBtn) applyBtn.style.display = 'none';

    return displayData;
  }
}
