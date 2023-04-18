import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from 'src/models/user.class';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient) { }

  /**
* signs up the user to firebase
* @param email email of the user who wants to signup
* @param password password of the user who wants to signup
* @returns observable to subscribe 
*/
  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAP8FbFg5PBGGlvYDwZJr6fU3a9ho1dgHg',
      {
        // email: email is the same like email
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError), tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        })
      )
  };

  /**
* checks if the user has already an account and login if so
* @param email email of the user who wants to signup
* @param password password of the user who wants to signup
* @returns observable to subscribe 
*/
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAP8FbFg5PBGGlvYDwZJr6fU3a9ho1dgHg',
      {
        email,
        password,
        returnSecureToken: true
      }
    )
      .pipe(
        catchError(this.handleError), tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }))
  };

  private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      localId,
      idToken,
      expirationDate
    );
    // emit the current user
    this.user.next(user)
  }


  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unkown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      // throws back an observable
      return throwError(() => new Error(errorMessage))
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(() => new Error(errorMessage))
  }
}
