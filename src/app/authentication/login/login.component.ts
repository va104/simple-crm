import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error: string = null;

  @Input() isLoginMode: boolean;
  @ViewChild('loginForm') loginForm: NgForm;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  resetForm() {
    this.loginForm.resetForm();
  }
  
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    // change the observable this variable holds
    // after the if check one of the observables will be stored here
    // at the end we can subscribe on this observable which holds the correct response
    const authObs: Observable<AuthResponseData> = this.isLoginMode ? this.authService.login(email, password) : this.authService.signup(email, password)

    // this works because the handling of next and error is equal for both methods
    authObs.subscribe({
      next: (resp) => {
        this.isLoading = false;
        this.router.navigate(['/simpleCRM']);
      },
      // we subscribed to an observable and handle the errormessage in
      // the authService. So just the error is returned just in case
      error: (errorMessage) => {
        this.error = errorMessage
        this.isLoading = false;
      }
    })
    form.reset()
  }
}
