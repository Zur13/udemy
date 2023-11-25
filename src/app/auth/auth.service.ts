import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean; // login response only field
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  //token: string = null;
  private autoLogoutTimeoutId;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAaGo6giBMBjSuQQcSAVoXyEfu906-IcYU',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError), tap(this.handleAuthResponse.bind(this)));
  }

  login(email: string, password: string) {
    if (this.autoLogoutTimeoutId) {
      clearTimeout(this.autoLogoutTimeoutId);
      this.autoLogoutTimeoutId = null;
    }
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAaGo6giBMBjSuQQcSAVoXyEfu906-IcYU',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError), tap(this.handleAuthResponse.bind(this)));
  }

  private handleAuthResponse(respData: AuthResponseData) {
    const expDate = new Date(new Date().getTime() + parseInt(respData.expiresIn) * 1000);
    const user = new User(respData.email, respData.localId, respData.idToken, expDate);
    this.user.next(user);
    this.autoLogout(+respData.expiresIn * 1000)
    localStorage.setItem('authData', JSON.stringify(user));
  }

  private handleError(errorResp: HttpErrorResponse) {
    let errMsg = 'Unknown error occurred!'
    console.log(errorResp);
    if (!errorResp.error || !errorResp.error.error) {
      return throwError(errMsg);
    }
    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errMsg = 'Error: email already exist!';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errMsg = 'Error: invalid login credentials!';
        break;
      case 'EMAIL_NOT_FOUND':
        errMsg = 'Error: email not found!';
        break;
      case 'INVALID_PASSWORD':
        errMsg = 'Error: invalid password!';
        break;
      case 'USER_DISABLED':
        errMsg = 'Error: user disabled!';
        break;
    }
    //errMsg = errorResp.error.error.message;
    return throwError(errMsg);
  }

  autoLogin() {
    const userData = localStorage.getItem('authData');
    // console.log(userData)
    if (userData) {
      const loadedUser: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(userData);
      if (loadedUser) {
        const user = new User(loadedUser.email, loadedUser.id, loadedUser._token, new Date(loadedUser._tokenExpirationDate));
        if (user.token) {
          // console.log("Autologin!!!!!!!!!!")
          this.user.next(user);
          const expDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
          this.autoLogout(expDuration);
        }
      }
    }

  }

  autoLogout(expirationDuration: number) {
    if (this.autoLogoutTimeoutId) {
      clearTimeout(this.autoLogoutTimeoutId);
      this.autoLogoutTimeoutId = null;
    }

    console.log("Auto Logout scheduled in ", expirationDuration);
    this.autoLogoutTimeoutId = setTimeout(() => {
      console.log("Auto Logout !!!");
      this.logout();
      this.autoLogoutTimeoutId = null;
    }, expirationDuration - 100);
  }

  logout() {
    localStorage.removeItem('authData');
    this.user.next(null);
    this.router.navigate(['/auth']);

    if (this.autoLogoutTimeoutId) {
      clearTimeout(this.autoLogoutTimeoutId);
      this.autoLogoutTimeoutId = null;
    }
  }
}
