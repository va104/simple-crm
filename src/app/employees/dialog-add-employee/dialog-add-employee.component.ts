import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { Employee } from 'src/models/employee.class';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { NgModel } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FirestorageService } from 'src/app/services/firestorage.service';


@Component({
  selector: 'app-dialog-add-employee',
  templateUrl: './dialog-add-employee.component.html',
  styleUrls: ['./dialog-add-employee.component.scss']
})
export class DialogAddEmployeeComponent implements OnInit {
  employee = new Employee();
  birthDate: Date;
  showProgressBar = false;
  file: any = {};
  imgageURL = '../../../assets/img/user.png';
  @ViewChild('myImg') myImg: ElementRef;
  @ViewChild('email') email: NgModel;

  constructor(
    public dialogRef: MatDialogRef<DialogAddEmployeeComponent>,
    private firestoreService: FirestoreService,
    private firestorageService: FirestorageService, 
    public storage: Storage) {
  }

  ngOnInit(): void {
    console.log(this.employee)
  }

  /**
   * saves the employee in the employees-collection
   * simulate progress bar for better user experience
   */
  saveEmployee() {
    this.showProgressBar = !this.showProgressBar
    // this.employee.birthDate = this.birthDate.getTime();
    this.firestoreService.createEmployee(this.employee).then(() => {
      this.showProgressBar = !this.showProgressBar;
      this.dialogRef.close(); 
    })
  }

  chooseFile() {
    console.log(this.file)
  }

  addImage(event: any) {
    this.file = event.target.files[0];

    this.firestorageService.saveImageFirestorage(this.file, (urlPromise: Promise<any>) => {
      urlPromise.then((downloadURL: string) => {
          this.myImg.nativeElement.src = downloadURL;
          this.employee.avatar = downloadURL;
      })
    })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'E-Mail is required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}