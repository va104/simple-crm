import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  allUsers: User[];

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges({idField: 'customIdName'})
      .subscribe((changes: any) => {
        this.allUsers = changes;
      });
  }

  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }
}
