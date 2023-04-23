import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  isLoginMode = true;

  @ViewChild(LoginComponent) loginForm!: LoginComponent;

  constructor() { }

  ngOnInit(): void {
  }

/**
 * After changing the view between login and signup the form has to be reset an error messages can be deleted
 */
  onSwitchMode(mode: string) {
    mode == 'login' ? this.isLoginMode = true : this.isLoginMode = false;
    this.loginForm.resetForm();
    this.loginForm.error = '';
  }
}
