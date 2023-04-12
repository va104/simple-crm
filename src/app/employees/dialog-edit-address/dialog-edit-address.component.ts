import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';
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
    private firestoreService: FirestoreService) { }

  ngOnInit(): void {
  }

  /**
* save changes in firestore database
*/
  saveEmployee() {
    this.showProgressBar = !this.showProgressBar;
    this.firestoreService.updateSingleEmployee(this.employeeId, this.employee)
      .then(() => {
        this.showProgressBar = !this.showProgressBar;
        this.dialogRef.close()
      })
  }
}
