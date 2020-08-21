import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from '../User/user.service';
import { SpinnerService } from '../Spinner/spinner.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private spinnerService: SpinnerService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.spinnerService.requestStarted();
    return next.handle(request).pipe(
      catchError((err) => {
        // this.spinnerService.requestEnded();
        // this.spinnerService.resetSpinner();
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.userService.Logout();
          //location.reload(true);
        }
        //const error = err.error.message || err.statusText;
        return throwError(err);
      })
    );
  }
}
