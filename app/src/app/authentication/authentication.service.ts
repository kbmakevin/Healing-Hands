import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
  type?: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private _http: HttpClient, private _router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this._router.navigateByUrl('/');
  }

  // used to check validty of user's session
  public getUserDetails(): UserDetails {
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
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public register(user: TokenPayload): Observable<any> {
    return this._request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this._request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this._request('get', 'profile');
  }

  // PRIVATE METHODS
  private _request(method: 'post' | 'get', type: 'login' | 'register' | 'profile', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this._http.post(`/api/${type}`, user);
    } else {
      base = this._http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

}

// import { Injectable } from '@angular/core';
// import { Http, Response, RequestOptions, Headers } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import { Credentials } from '../interfaces/credentials';
// import { Student } from '../interfaces/student';

// @Injectable()
// export class AuthenticationService {
//   // public student;
//   private _baseURL = '/api/students';
//   private _student: Student;

//   constructor(private _http: Http) { }

//   isLoggedIn(): boolean {
//     // return this.student;
//     // console.log(`inside auth service checking if loggedin: ${sessionStorage.getItem('currentStudent') !== null}`);
//     return sessionStorage.getItem('currentStudent') !== null;
//   }

//   isAdmin(): boolean {
//     this._student = JSON.parse(sessionStorage.getItem('currentStudent'));
//     return this._student.role === 'admin';
//   }

//   getStudent(): Student {
//     return JSON.parse(sessionStorage.getItem('currentStudent'));
//   }

//   login(credentials: Credentials): Observable<any> {
//     // perform a request with 'post' http method
//     return this._http
//       .post(this._baseURL + '/login', credentials)
//       // .map(res => this.student = res.json())
//       .map(res => {
//         sessionStorage.setItem('currentStudent', res.text());
//       })
//       .catch(this._handleError);
//   }

//   // 2018.03.28 - 22:03:42
//   logout() {
//     // remove student from session storage to log user out
//     sessionStorage.removeItem('currentStudent');
//     // this.student = undefined;
//   }

//   private _handleError(error: Response) {
//     return Observable.throw(error.json().message || 'Server error');
//   }
// }
