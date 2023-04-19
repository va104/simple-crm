import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-simple-crm',
  templateUrl: './simple-crm.component.html',
  styleUrls: ['./simple-crm.component.scss']
})
export class SimpleCRMComponent implements OnInit, OnDestroy {
  userSub : Subscription;
  isAuthenticated = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
   this.userSub = this.authService.user.subscribe(user => {
     // user is null or it exists with an concrete object
     this.isAuthenticated = !!user
    // !! is the same like this.isAuthenticated = !user ? false : true
   })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout()
  }
}
