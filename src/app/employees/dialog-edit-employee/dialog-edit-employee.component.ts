import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Employee } from 'src/models/employee.class';

@Component({
  selector: 'app-dialog-edit-employee',
  templateUrl: './dialog-edit-employee.component.html',
  styleUrls: ['./dialog-edit-employee.component.scss']
})
export class DialogEditEmployeeComponent implements OnInit {
  employee: Employee
  employeeId: string;
  showProgressBar = false;
  birthDate: Date;

  constructor(
    public dialogRef: MatDialogRef<DialogEditEmployeeComponent>,
    private firestoreService: FirestoreService) { }

  ngOnInit(): void {
  }

  saveEmployee() {
    this.showProgressBar = !this.showProgressBar;
    this.firestoreService.updateSingleEmployee(this.employeeId, this.employee)
      .then(() => {
        this.showProgressBar = !this.showProgressBar;
        this.dialogRef.close()
      })
  }
}
