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

export const TOKEN_NAME: string = 'UserToken';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string;
  token: string;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {
    this.url = 'https://localhost:6002/api/User/';
    //this.url = 'https://projectmanagerapi.shanahjr.co.za/api/User/';
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
