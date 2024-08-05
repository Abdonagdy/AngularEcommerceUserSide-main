import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { finalize, delay, switchMap } from 'rxjs/operators';
import { SpinnerServiceService } from './Components/spinner-service.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private spinnerService: SpinnerServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    const startTime = Date.now();

    return next.handle(req).pipe(
      finalize(() => {
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(1500 - elapsed, 0);
        
        of(null).pipe(
          delay(remainingTime)
        ).subscribe(() => {
          this.spinnerService.hide();
        });
      })
    );
  }
}
