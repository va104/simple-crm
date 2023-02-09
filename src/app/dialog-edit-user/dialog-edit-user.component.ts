import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  user: User = new User();
  userId: string;
  showProgressBar = false;
  birthDate: Date;

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private firestore: AngularFirestore,) { }

  ngOnInit(): void {
  }

  saveUser() {
    this.showProgressBar = !this.showProgressBar;
    this
    .firestore
    .collection('users')
    .doc(this.userId)
    .update(this.user.toJSON())
    .then(() => {
        this.showProgressBar = !this.showProgressBar;
        this.dialogRef.close()
      })
  }
}
