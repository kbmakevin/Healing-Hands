import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { User } from '../app.interface';

interface TokenResponse {
  token: string;
}

@Injectable()
export class AuthenticationService {
  private _token: string;

  constructor(private _http: HttpClient, private _router: Router) { }

  private _saveToken(token: string): void {
    localStorage.setItem('comp308-w2018-project-auth-token', token);
    this._token = token;
  }

  public getToken(): string {
    if (!this._token) {
      this._token = localStorage.getItem('comp308-w2018-project-auth-token');
    }
    return this._token;
  }

  public logout(): void {
    this._token = '';
    window.localStorage.removeItem('comp308-w2018-project-auth-token');
    this._router.navigateByUrl('/');
  }

  // used to check validty of user's session
  public getUser(): User {
    const token = this.getToken();
    let payload;
    if (token) {
      // tokens are heaader.payload.signature, we interested in payload
      payload = token.split('.')[1];
      // native function to modern browsers, decodes base64 strings
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUser();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  // nurses and patients have different privaleges in this system
  public isNurse(): boolean {
    const user = this.getUser();
    if (user) {
      return user.type === 'nurse';
    } else {
      return false;
    }
  }

  public register(user: User): Observable<any> {
    return this._request('post', 'register', user);
  }

  public login(user: User): Observable<any> {
    return this._request('post', 'login', user);
  }

  // public profile(): Observable<any> {
  //   return this._request('get', 'profile');
  // }

  // PRIVATE METHODS
  private _request(method: 'post' | 'get', type: 'login' | 'register', user?: User): Observable<any> {
    let base;
    // console.log(`ID: ${this.getUserDetails()._id} has logged in!`);


    if (method === 'post') {
      base = this._http.post(`/api/${type}`, user);
    } else {

      // switch (type) {
      //   case 'profile':
      base = this._http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
      //   break;

      // default:
      //   break;
      // }
      // const params = new HttpParams()
      //   .set('id', this.getUserDetails()._id);

      // base = this._http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }, params });
      // base = this._http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
      // base = this._http.get(`/api/${type}/${this.getUserDetails()._id}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this._saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

}
