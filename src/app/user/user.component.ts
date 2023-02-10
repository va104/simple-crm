import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  allUsers = [];
  pageSlice = [];

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allUsers = changes;
        // console.log(this.allUsers)
        // show the first 10 elements
        this.pageSlice = this.allUsers.slice(0, 10)
      });

    
  }

  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }

  onPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageSize * event.pageIndex;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.allUsers.length) {
      endIndex = this.allUsers.length
    }
    this.pageSlice = this.allUsers.slice(startIndex, endIndex)

  }
}
