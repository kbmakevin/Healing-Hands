import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserService {
  private _baseURL = '/api/users';

  constructor(
    private _authService: AuthenticationService,
    private _http: HttpClient) { }

  public listUsers(): Observable<any> {
    return this._http
      .get(this._baseURL)
      .map(res => res)
      .catch(this.handleError);
  }
  public getUser(id: any): Observable<any> {
    return this._http
      .get(this._baseURL + '/' + id)
      // .map((res: Response) => res.json())
      .map(res => res)
      .catch(this.handleError);
  }

  // NURSE FUNCTIONALITIES
  // CRUD motivation
  // prioritize create first

  // PATIENT FUNCTIONALITIES
  // Read motivation

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return Observable.throw(error.message || 'Server error');
  }
}
