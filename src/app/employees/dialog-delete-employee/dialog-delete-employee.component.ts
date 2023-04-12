import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Employee } from 'src/models/employee.class';

@Component({
  selector: 'app-dialog-delete-employee',
  templateUrl: './dialog-delete-employee.component.html',
  styleUrls: ['./dialog-delete-employee.component.css']
})
export class DialogDeleteEmployeeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {employee: Employee, employeeId: string},
    public dialogRef: MatDialogRef<DialogDeleteEmployeeComponent>,
    private firestoreService: FirestoreService,
    private router: Router
    ) { 

  }

  ngOnInit(): void {
  }

  /**
* deletes the selected employee and navigates to /employee
*/
  deleteEmployee() {
    this.dialogRef.close();
    this.router.navigate(['/employee'])
    this.firestoreService.deleteSingleEmployee(this.data.employeeId)
      .then(() => {
      })
  }
}
