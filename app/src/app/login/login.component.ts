import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { User } from '../app.interface';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: User = {
    email: '',
    password: ''
  };

  constructor(private _authService: AuthenticationService, private _router: Router, private _alertService: AlertService) { }

  login() {
    this._authService.login(this.credentials).subscribe(() => {
      this._router.navigateByUrl('/home');
    }, (err) => {
      this._alertService.error(err.error.message);
      console.error(err);
    });
  }
}

// import { Component, OnInit } from '@angular/core';
// import { AuthenticationService } from '../authentication/authentication.service';
// import { Router, ActivatedRoute } from '@angular/router';
// import { Credentials } from '../interfaces/credentials';
// import { AlertService } from '../alert/alert.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   // errorMessage: string;
//   returnUrl: string;
//   credentials: Credentials = {
//     studentNumber: undefined,
//     password: ''
//   };
//   constructor(
//     private _alertService: AlertService,
//     private _authService: AuthenticationService,
//     private _router: Router,
//     private _route: ActivatedRoute) { }

//   // 2018.03.29 - 19:41:31 - user auto logged out upon visiting /login page
//   // so login page can be used to logout
//   ngOnInit() {
//     // reset login status
//     this._authService.logout();

//     // get return url from route parameters or default to '/home'
//     this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/home';
//   }

//   login() {
//     this._authService.login(this.credentials)
//       .subscribe(
//         result => this._router.navigate([this.returnUrl]),
//         // result => this._router.navigate(['/home']),
//         // error => console.log(`ive receive3d error! ${error}`));
//         error => this._alertService.error(error));
//     // this.errorMessage = error);
//   }
// }
