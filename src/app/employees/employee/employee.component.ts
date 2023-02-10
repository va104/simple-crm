import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DialogAddEmployeeComponent } from '../dialog-add-employee/dialog-add-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  allEmployees = [];
  pageSlice = [];

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('employees')
      .valueChanges({ idField: 'employeeId' })
      .subscribe((changes: any) => {
        this.allEmployees = changes;
        // show the first 10 elements
        this.allEmployees.sort(this.sortArray);
        this.pageSlice = this.allEmployees.slice(0, 10);
      }); 
  }

  openDialog(): void {
    this.dialog.open(DialogAddEmployeeComponent);
  }

  onPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageSize * event.pageIndex;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.allEmployees.length) {
      endIndex = this.allEmployees.length
    }
    this.pageSlice = this.allEmployees.slice(startIndex, endIndex)
  }

  sortArray( a, b ) {
    if ( a.lastName < b.lastName ){
      return -1;
    }
    if ( a.lastName > b.lastName ){
      return 1;
    }
    return 0;
  }
  
}
