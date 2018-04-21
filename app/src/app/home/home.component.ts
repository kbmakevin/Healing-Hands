import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'home component';
  constructor(
    public authService: AuthenticationService) {
  }

  ngOnInit() {
    // if (!this._authService.isAdmin()) {
    //   this._router.navigate(['/students/details'],
    //     { queryParams: { 'id': this._authService.getStudent()._id } });
    // }
  }
}
