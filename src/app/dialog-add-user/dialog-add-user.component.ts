import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user = new User();
  birthDate: Date; 
  showProgressBar = false;
  
  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private firestore: AngularFirestore,) { 

    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser() {
    this.showProgressBar = !this.showProgressBar
    this.user.birthDate = this.birthDate.getTime();

    this.firestore
      .collection('users')
      .add(this.user.toJSON())
      .then((result: any) => {

        //for user experience
        setTimeout(() => {
          this.showProgressBar = !this.showProgressBar;
          this.dialogRef.close();
        }, 1000);
      })
  }
}


