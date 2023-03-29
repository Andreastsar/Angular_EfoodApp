import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  auth_token: string;

  constructor(private authService: AuthService) {
    this.authService.userObservable.subscribe((user) => {
      this.auth_token = user.token;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (this.auth_token) {
      const modifiedRequest = request.clone({
        headers: request.headers.append('auth_token', this.auth_token),
      });
      return next.handle(modifiedRequest);
    }

    return next.handle(request);
  }
}
