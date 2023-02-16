import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from 'src/models/employee.class';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';


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

  constructor(
    public dialogRef: MatDialogRef<DialogAddEmployeeComponent>,
    private firestore: AngularFirestore,
    public storage: Storage) {
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

  chooseFile() {
    console.log(this.file)
  }

  addData(event: any) {
    this.file = event.target.files[0];
    const storageRef = ref(this.storage, this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(this.imgageURL, downloadURL, this.myImg)
          this.imgageURL = downloadURL;
          console.log(this.imgageURL, downloadURL, this.myImg)
          this.myImg.nativeElement.src = this.imgageURL
          // const img = (<HTMLImageElement>document.getElementById(myImg))
        });
      }
    );
  }

  getData() {
    // Create a reference from a Google Cloud Storage URI
    const gsReference = ref(this.storage, 'gs://crm-system-6afdc.appspot.com/profile.png');


    getDownloadURL(gsReference)
      .then((url) => {
        // Insert url into an <img> tag to "download"
        console.log(url);
        this.imgageURL = url;
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }
}