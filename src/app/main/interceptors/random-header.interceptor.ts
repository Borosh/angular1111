import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RandomHeaderInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const updatedReq = req.clone({
      setHeaders: {
        random: 'myRandomHeaderValue',
      },
    });
    return next.handle(updatedReq);
    /*    return next.handle(req).pipe(
      tap(_ => console.log('DO SOMETHING AFTER THE REQUEST'))
    ) */
  }
}
