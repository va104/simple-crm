import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from 'src/models/employee.class';

@Component({
  selector: 'app-dialog-add-employee',
  templateUrl: './dialog-add-employee.component.html',
  styleUrls: ['./dialog-add-employee.component.scss']
})
export class DialogAddEmployeeComponent implements OnInit {
  employee = new Employee();
  birthDate: Date; 
  showProgressBar = false;
  
  constructor(
    public dialogRef: MatDialogRef<DialogAddEmployeeComponent>,
    private firestore: AngularFirestore,) { 

    }

  ngOnInit(): void {
    console.log(this.employee)
  }

  saveEmployee() {
    this.showProgressBar = !this.showProgressBar
    // this.employee.birthDate = this.birthDate.getTime();

    this.firestore
      .collection('employees')
      .add(this.employee.toJSON())
      .then((result: any) => {
        this.showProgressBar = !this.showProgressBar;
        this.dialogRef.close();
      })
  }
}


