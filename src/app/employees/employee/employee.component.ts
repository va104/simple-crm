import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DialogAddEmployeeComponent } from '../dialog-add-employee/dialog-add-employee.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/models/employee.class';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {
  allEmployees: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'address.city'];
  
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
        this.allEmployees.sortingDataAccessor = (item, city) => {
          switch(city) {
            case 'address.city': return item.address.city;
            default: return item[city];
          }
        };
        this.allEmployees.sort = this.sort;
      });
  }

  openDialog(): void {
    this.dialog.open(DialogAddEmployeeComponent);
  }
}
