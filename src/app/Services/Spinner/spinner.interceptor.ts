import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //debugger;
    this.spinnerService.requestStarted();

    // return next.handle(request).pipe(
    //   map(
    //     (event: HttpEvent<any>) => {
    //       this.spinnerService.requestEnded();
    //       if (event instanceof HttpResponse) {
    //         this.spinnerService.requestEnded();
    //       }
    //       return event;
    //     },
    //     (error) => {
    //       debugger;
    //       this.spinnerService.resetSpinner();
    //     }
    //   )
    // );

    return this.handler(next, request);
  }

  handler(next, request) {
    return next.handle(request).pipe(
      tap(
        (event) => {
          //this.spinnerService.requestEnded();
          if (event instanceof HttpResponse) {
            //debugger;
            this.spinnerService.requestEnded();
          }
        },
        (error) => {
          //debugger;
          this.spinnerService.resetSpinner();
        }
      )
    );
  }
}
