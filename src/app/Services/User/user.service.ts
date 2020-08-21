import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// import * as jwt_decode from 'jwt-decode';
// import { JwtModule } from '@auth0/angular-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LogInModel } from '../../Models/LogIn/log-in-model';
import { UserModel } from '../../Models/User/user-model';
import { take } from 'rxjs/operators';
import * as JwtDecode from 'jwt-decode';
import { ForgotPasswordModel } from 'src/app/Models/LogIn/forgot-password';

export const TOKEN_NAME: string = 'UserToken';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string;
  token: string;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  httpOptions: any;

  constructor(private http: HttpClient, private router: Router) {
    //this.url = 'https://localhost:6002/api/User/';
    let headers = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('UserToken'),
    });
    let option = { headers: headers };
    this.url = 'https://projectmanagerapi.shanahjr.co.za/api/User/';
  } // constructor

  //If no value is returned then it wasa success
  Login(model: LogInModel) {
    return this.http.post<any>(this.url + 'Login', model);
  } //LogIn

  Logout() {
    localStorage.removeItem('UserRole');
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['/LogIn']);
  }

  Register(model: UserModel) {
    return this.http.post<UserModel>(this.url, model, {
      headers: this.headers,
    });
  } //Register

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  ConfirmEmail(id: number) {
    return this.http.get(this.url + 'ConfirmEmail/' + id);
  }

  ResendConfirmationEmail(email: string) {
    return this.http.get(this.url + 'ResendConfirmationEmail/' + email);
  }

  ForgotPassword(email: string) {
    return this.http.get(this.url + 'ForgotPassword/' + email);
  }

  ChangePassword(Password: string, token: string) {
    //let info = { Password: Password };
    var newPassword = new ForgotPasswordModel();
    newPassword.password = Password;
    //this.httpOptions.headers.set('Authorization', 'bearer ' + token);
    let headers = new HttpHeaders({
      Authorization: 'bearer ' + token,
    });
    let option = { headers: headers };
    return this.http.post(this.url + 'ChangePassword/', newPassword, option);
  }

  // getTokenExpirationDate(token: string): Date {
  //   const helper = new JwtHelperService();

  //   const expirationDate = helper.getTokenExpirationDate(token);

  //   if (expirationDate === undefined) return null;

  //   return expirationDate;
  // }

  // isTokenExpired(token?: string): boolean {
  //   if (!token) token = this.getToken();
  //   if (!token) return true;

  //   const date = this.getTokenExpirationDate(token);
  //   if (date === undefined) return false;
  //   return !(date.valueOf() > new Date().valueOf());
  // }
} // Export
