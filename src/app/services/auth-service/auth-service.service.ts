import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { UserDetails, TokenPayload, TokenResponse, RegisterDetails, LoginModel } from '../../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private _id: string;
  public userDetailsSubject: BehaviorSubject<UserDetails> = new BehaviorSubject(this.getUserDetails());

  private checkStaleTokenTimer: any;

  constructor(private http: HttpClient, private router: Router) {
    this.resetStaleTimer();
  }

  private resetStaleTimer() {
    if (this.checkStaleTokenTimer) {
      clearTimeout(this.checkStaleTokenTimer)
    }
    this.checkStaleTokenTimer = setTimeout(this.checkIfTokenIsStale, 1000*60*60*24*(7.5));//7days
  }

  private checkIfTokenIsStale = ()=> {
    this.request('get', '/users/tokenCheck').subscribe(result => {
      this.resetStaleTimer();
    }, error => {
      if(this.getToken()){
      }
      this.resetStaleTimer();
    })
  }

  private saveToken(token: string, _id: string): void {
    localStorage.setItem('jwtToken', token);
    this.token = token;

    localStorage.setItem('_id', _id);
    this._id = _id;
    this.userDetailsSubject.next(this.getUserDetails());
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('jwtToken');
    }
    return this.token;
  }

  public getUserID(): string {
    if (!this._id) {
      this._id = localStorage.getItem('_id');
    }
    return this._id && this.isLoggedIn() ? this._id : null;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('jwtToken');
    //this.router.navigateByUrl('/login');
    this.userDetailsSubject.next(this.getUserDetails());
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    }
    else {
      return false;
    }
  }

  public request(method: 'post' | 'get' | 'patch' | 'delete' | 'put', url, params?: any): Observable<any> {

    let base;
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.getToken()}`);

    switch (method) {
      case 'post':
        base = this.http.post(environment.apiUrl + url, params, { headers: headers });
        break;
      case 'get':
        base = this.http.get(environment.apiUrl + url, { headers: headers, params: params });
        break;
      case 'patch':
        base = this.http.patch(environment.apiUrl + url, params, { headers: headers });
        break;
      case 'delete':
        base = this.http.delete(environment.apiUrl + url, { headers: headers });
        break;
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token, data._id);
        }
        return data;
      })
    )

    return request;
  }

  public login(user: LoginModel): Observable<any> {
    return this.request('post', '/users/login', user);
  }

  public register(registerDetails: RegisterDetails): Observable<any> {
    return this.request('post', '/users/register', registerDetails);
  }
}
