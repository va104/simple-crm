import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/models/employee.class';

@Component({
  selector: 'app-dialog-edit-employee',
  templateUrl: './dialog-edit-employee.component.html',
  styleUrls: ['./dialog-edit-employee.component.scss']
})
export class DialogEditEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  employeeId: string;
  showProgressBar = false;
  birthDate: Date;

  constructor(
    public dialogRef: MatDialogRef<DialogEditEmployeeComponent>,
    private firestore: AngularFirestore,) { }

  ngOnInit(): void {
  }

  saveEmployee() {
    this.showProgressBar = !this.showProgressBar;
    this
    .firestore
    .collection('employees')
    .doc(this.employeeId)
    .update(this.employee.toJSON())
    .then(() => {
        this.showProgressBar = !this.showProgressBar;
        this.dialogRef.close()
      })
  }
}
