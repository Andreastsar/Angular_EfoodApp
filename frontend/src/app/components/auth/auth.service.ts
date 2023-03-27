import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import {
  LOGIN_BY_EMAIL_PASSWORD,
  USER_REGISTRATION,
} from 'src/app/shared/constants/url';
import { User } from 'src/app/shared/models/user.model';
import { UserLoginI } from '../shared/interfaces/userLogin.interface';
import { UserRegisterI } from '../shared/interfaces/userRegister.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  // -----------------------------------------------------------------------

  // Register
  userRegister(userInfo: UserRegisterI): Observable<User> {
    return this.http.post<User>(USER_REGISTRATION, userInfo).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        this.toastrService.error(
          'Registration failed!',
          'User with the same email already exists',
          { timeOut: 2000 }
        );

        setTimeout(() => {
          window.location.reload();
        }, 2000);

        return throwError(() => {
          return this.handleError(errorResponse);
        });
      }),
      tap((userResponseData) => {
        this.handleAuthentication(
          userResponseData.id,
          userResponseData.name,
          userResponseData.email,
          userResponseData.address,
          userResponseData.token,
          userResponseData.isAdmin
        );
      })
    );
  }

  // -----------------------------------------------------------------------

  // Login
  userLogin(userCredentials: UserLoginI): Observable<User> {
    return this.http.post<User>(LOGIN_BY_EMAIL_PASSWORD, userCredentials).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        this.toastrService.error(
          'Invalid Username or password',
          'Login failed',
          { timeOut: 2000 }
        );

        setTimeout(() => {
          window.location.reload();
        }, 2000);

        return throwError(() => {
          return this.handleError(errorResponse);
        });
      }),
      tap((userResponseData) => {
        this.handleAuthentication(
          userResponseData.id,
          userResponseData.name,
          userResponseData.email,
          userResponseData.address,
          userResponseData.token,
          userResponseData.isAdmin
        );
      })
    );
  }

  // -----------------------------------------------------------------------
  // Logout
  userLogout() {
    this.userSubject.next(new User());

    localStorage.removeItem('user');
  }

  // -----------------------------------------------------------------------

  // Handle Authentication
  private handleAuthentication(
    id: string,
    name: string,
    email: string,
    address: string,
    token: string,
    isAdmin: boolean
  ) {
    const user = new User();
    user.id = id;
    user.name = name;
    user.email = email;
    user.address = address;
    user.token = token;
    user.isAdmin = isAdmin;

    this.userSubject.next(user);

    this.saveUserToLocalStorage(user);

    this.toastrService.success(
      `Welcome back ${user.name}`,
      'Logged in Successfully'
    );
  }

  // Handle Error Messages
  private handleError(error: HttpErrorResponse): string {
    let errorMessage = 'An unknown error has occured';

    // Todo errors from MongoDb

    return errorMessage;
  }

  // Save user to local storage
  private saveUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return new User();
    }
  }

  getUser(): User {
    return this.userSubject.value;
  }
}
