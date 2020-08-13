import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOKEN_NAME } from '../User/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    //const currentUser = this.authenticationService.currentUserValue;
    //const isLoggedIn = currentUser && currentUser.token;
    //const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (
      localStorage.getItem(TOKEN_NAME) != null ||
      localStorage.getItem(TOKEN_NAME) != undefined
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_NAME)}`,
        },
      });
    }

    return next.handle(request);
  }
}
