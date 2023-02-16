import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DialogAddEmployeeComponent } from '../dialog-add-employee/dialog-add-employee.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/models/employee.class';
import { MatSelectChange } from '@angular/material/select';
import * as myGlobals from 'src/app/common/globals'


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {
  allEmployees: any;
  allDepartments: string[]= myGlobals.allDepartments;
  displayedColumns: string[] = ['lastName', 'employment.title', 'employment.department', 'employment.keySkill', 'email'];
  
  @ViewChild('sort') sort: MatSort;
  @ViewChild('page') paginator: MatPaginator;
  
  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore) { }

    ngOnInit(): void {
      this.firestore
      .collection('employees')
      .valueChanges({ idField: 'employeeId' })
      .subscribe((changes: any) => {
        this.allEmployees = new MatTableDataSource<Employee>(changes);
        this.allEmployees.paginator = this.paginator;
        this.sortNestedProperties();
        this.filterForNestedObjects();
      });
    }
    
  openDialog(): void {
    this.dialog.open(DialogAddEmployeeComponent);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; 
    this.allEmployees.filter = filterValue.trim().toLowerCase();
  }

  sortNestedProperties () {
    this.allEmployees.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'employment.title': return item.employment.title;
        case 'employment.keySkill': return item.employment.keySkill;
        case 'employment.department': return item.employment.department;
        default: return item[property];
      }
    };
    this.allEmployees.sort = this.sort;    
  }

  filterForNestedObjects() {
    this.allEmployees.filterPredicate = (data, filter) => {
      return data.employment.keySkill.toLocaleLowerCase().includes(filter) ||
      data.employment.department.toLocaleLowerCase().includes(filter) ||
      data.firstName.toLocaleLowerCase().includes(filter) ||
      data.lastName.toLocaleLowerCase().includes(filter)
    } 
  }

  furtherFilter(event) {
    let filterValue = (event as MatSelectChange).value; 
    if (filterValue == 'all') {
      filterValue = '';
      this.allEmployees.filter = filterValue.trim().toLowerCase();
    } else {
      this.allEmployees.filter = filterValue.trim().toLowerCase();
    }
  }
}
