import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  user: User = new User();
  userId: string;
  showProgressBar = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    private firestore: AngularFirestore) { }

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
