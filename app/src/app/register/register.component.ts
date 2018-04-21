import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    type: ''
  };

  constructor(private _authService: AuthenticationService, private _router: Router) { }

  register() {
    this._authService.register(this.credentials).subscribe(() => {
      this._router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }
}
