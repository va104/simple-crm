import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/models/employee.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  employee: Employee = new Employee();
  employeeId: string;
  showProgressBar = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    private firestore: AngularFirestore) { }

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
