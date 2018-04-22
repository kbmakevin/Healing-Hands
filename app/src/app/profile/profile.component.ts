import { Component, OnInit } from '@angular/core';
// import { AuthenticationService, UserDetails } from '../authentication/authentication.service';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  // details: UserDetails;

  constructor() { }
  // constructor(private _authService: AuthenticationService) { }

  ngOnInit() {
    // depending on user nurse or patient, and if there is id in url, can do diff things
    // this._authService.profile().subscribe(user => {
    //   this.details = user;
    // }, (err) => {
    //   console.error(err);
    // });
  }
}
