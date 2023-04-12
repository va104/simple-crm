import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Employee } from 'src/models/employee.class';
import { DialogDeleteEmployeeComponent } from '../dialog-delete-employee/dialog-delete-employee.component';
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
  showProgressBar = false;

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    public dialog: MatDialog) { }

  /**
* get the id of the employee in the current route
* the id is used for firestore to identify the employee
*/
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeeId = params['employeeId'];
      this.getEmployee();
    })
  }

  /**
* after ngOnInit the selected employee will be displayed
*/
  getEmployee() {
    if (this.employeeId) {
      this.firestoreService.getSingleEmployee(this.employeeId)
        .subscribe((singleUser: any) => {
          this.employee = singleUser
        })
    }
  }

  /**
* opens the dialog for editing the header information of the employee
*/
  editEmployee() {
    const dialog = this.dialog.open(DialogEditEmployeeComponent);
    // get access to the variables of the component
    // and fill the variable with a copy of the current employee
    dialog.componentInstance.employee = new Employee(this.employee);
    dialog.componentInstance.employeeId = this.employeeId;
  }

  /**
* opens the dialog for editing the address information
*/
  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.employee = new Employee(this.employee);
    dialog.componentInstance.employeeId = this.employeeId;
  }

  /**
* opens the dialog to check if the employee can be deleted
* the data of the employee are needed to display the name in the child
*/
  deleteEmployeeDialog(): void {
    this.dialog.open(DialogDeleteEmployeeComponent, {
      data: {
        employee: this.employee,
        employeeId: this.employeeId
      }
    });
  }
}