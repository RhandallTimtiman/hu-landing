import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, map, catchError, switchMap, tap, takeUntil } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  currentRequestCount = 0
  
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = req.headers;
    const authReq = req.clone({ headers });
    return next.handle(authReq).pipe(
      tap((evt: any) => {
        // console.log(evt.url)
        // if (evt instanceof HttpResponse) {
        //   if(evt.body && evt.status === 200) {
        //     if (evt.url.includes('login')) {
        //       this.store.dispatch(new SetUser(evt.body))
        //     }
        //   }
        // }
      }),
      catchError((error: HttpErrorResponse) => {
        // handle http errors
        return throwError(error.error);
      }),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event;
        }
      }),
      finalize(() => {
        this.currentRequestCount--;
        if (this.currentRequestCount === 0) {
          // hide loading spinner if all requests are done
          console.log('All requests are done');
        }
      })
    )
  }
}