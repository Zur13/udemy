import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpParams, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import {exhaustMap, take, tap} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authSrv: AuthService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // return next.handle(request).pipe(
    //   tap(
    //     (event) => {
    //       console.log('Server response', event);
    //     },
    //     (err) => {
    //       console.log('HttpError', err);
    //     }
    //   )
    // );
    return this.authSrv.user.pipe(
      // take 1 user and unsubscribe from authSrv.user
      take(1),
      // replace the user observable with the next.handle observable
      exhaustMap(user => {
        if (!user) {
          return next.handle(request);
        }
        const modReq = request.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modReq);
      }),
    );
  }
}
