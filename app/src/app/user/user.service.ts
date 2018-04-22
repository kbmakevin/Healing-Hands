import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserService {
  private _baseURL = '/api/users';

  constructor(
    private _authService: AuthenticationService,
    private _http: HttpClient) { }

  public getUser(id: any): Observable<any> {
    return this._http
      .get(this._baseURL + '/' + id)
      // .map((res: Response) => res.json())
      .map(res => res)
      .catch(this.handleError);
  }

  // private _request(method: 'post' | 'get', type: 'login' | 'register', ): Observable<any> {
  //   let base;
  //   const user = this._authService.getUser();

  //   if (method === 'post') {
  //     base = this._http.post(`/api/${type}`, user);
  //   } else {

  //     base = this._http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this._authService.getToken()}` } });
  //   }

  //   const request = base.pipe(
  //     map((data: TokenResponse) => {
  //       if (data.token) {
  //         this.saveToken(data.token);
  //       }
  //       return data;
  //     })
  //   );

  //   return request;
  // }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return Observable.throw(error.message || 'Server error');
  }
}
