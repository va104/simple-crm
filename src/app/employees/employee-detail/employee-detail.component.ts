import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/models/employee.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditEmployeeComponent } from '../dialog-edit-employee/dialog-edit-employee.component';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employeeId: string;
  employee = new Employee();

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeeId = params['employeeId'];
      this.getEmployee();
    })
  }

  getEmployee() {
    if(this.employeeId) {
      this.firestore
      .collection('employees')
      .doc(this.employeeId)
      .valueChanges()
      .subscribe((singleUser: any) => {
        this.employee = singleUser
      })
    }
  }

  editEmployee() {
    const dialog = this.dialog.open(DialogEditEmployeeComponent);
    // get access to the variables of the component
    // and fill the variable with a copy of the current employee
    dialog.componentInstance.employee = new Employee(this.employee);
    dialog.componentInstance.employeeId = this.employeeId;
  }
  
  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.employee = new Employee(this.employee);
    dialog.componentInstance.employeeId = this.employeeId;
  }
}
