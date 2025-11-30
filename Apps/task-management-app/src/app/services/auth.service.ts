import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/AuthResponse';
import { catchError } from 'rxjs';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  httpClient: HttpClient = inject(HttpClient);
  userSubject = new BehaviorSubject<User>(null);
  router = inject(Router);
  private tokenExpireTimer: any;

  signup(email, password) {
    const body = { email: email, password: password, returnSecureToken: true };
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`;
    return this.httpClient.post<AuthResponse>(url, body).pipe(
      catchError(this.handleError),
      tap((res) => {
        this.handleCreateUser(res);
      })
    );
  }

  login(email, password) {
    const body = { email: email, password: password, returnSecureToken: true };
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`;
    return this.httpClient.post<AuthResponse>(url, body).pipe(
      catchError(this.handleError),
      tap((res) => {
        this.handleCreateUser(res);
      })
    );
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) return;

    const loggedInUser = new User(
      user.email,
      user.id,
      user._token,
      user._expiresIn
    );

    if (loggedInUser.token) {
      this.userSubject.next(loggedInUser);
      const timerValue =
        new Date(user._expiresIn).getTime() - new Date().getTime();
      this.autoLogout(timerValue);
    }
  }

  private handleCreateUser(response: AuthResponse) {
    const expiresInTimestamp =
      new Date().getTime() + Number(response.expiresIn) * 1000;
    const expiresInDateTime = new Date(expiresInTimestamp);
    const user = new User(
      response.email,
      response.localId,
      response.idToken,
      expiresInDateTime
    );
    this.userSubject.next(user);
    this.autoLogout(Number(response.expiresIn) * 1000);
    localStorage.setItem('user', JSON.stringify(user));
  }

  autoLogout(expireTime: number) {
    this.tokenExpireTimer = setTimeout(() => {
      this.logout();
    }, expireTime);
  }

  logout() {
    this.userSubject.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('user');

    if (this.tokenExpireTimer) {
      clearTimeout(this.tokenExpireTimer);
    }

    this.tokenExpireTimer = null;
  }

  private handleError(err) {
    let errorMessage = 'An unknown error has occurred';

    if (!err.error || !err.error.error) {
      return throwError(() => errorMessage);
    }

    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'This operation is not allowed.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'The email ID or Password is not correct.';
        break;
    }

    return throwError(() => errorMessage);
  }
}
