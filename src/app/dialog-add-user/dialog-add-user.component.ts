import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user = new User();
  birthDate: Date; 
  
  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log(this.user)
  }
}


