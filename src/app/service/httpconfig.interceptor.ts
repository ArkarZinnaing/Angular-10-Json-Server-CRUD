import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { EMPTY } from 'rxjs';
import { SharedService } from './sharedservice.service'


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {


  /*
 -----------------------------------------------------
 ---------------  Http Handler  ----------------------
 -----------------------------------------------------
*/

  constructor(private _shared: SharedService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    req = req.clone({ body: req.body });

    console.log("Request Body", JSON.stringify(req.body))
    console.log("Request Params", req.urlWithParams)
    if (!req.urlWithParams)
      return EMPTY
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        console.log("API Data", event);

        return event
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("HTTP ERROR", error);

        if (error.error) {
          if (typeof error.error == 'string') {
            this._shared.toastrService.error(error.error)
          } else {
            this._shared.toastrService.error(error.error.message || "Internal Server error!");
          }
        }
        else
          this._shared.toastrService.error(error.error.message || "Sorry!, Try again later");


        return throwError(error)
      })
    );
  }

}
