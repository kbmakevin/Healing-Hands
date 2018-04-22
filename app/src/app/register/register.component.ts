import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { User } from '../app.interface';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  credentials: User = {
    email: '',
    name: '',
    password: '',
    type: ''
  };

  constructor(private _authService: AuthenticationService, private _router: Router) { }

  register() {
    this._authService.register(this.credentials).subscribe(() => {
      this._router.navigateByUrl('/home');
    }, (err) => {
      console.error(err);
    });
  }
}
