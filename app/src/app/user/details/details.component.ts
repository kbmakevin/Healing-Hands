import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { UserService } from '../user.service';
import { User } from '../../app.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  user: User;
  userId: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthenticationService,
    private _userService: UserService) {
    this._activatedRoute.queryParams
      .subscribe(params => {
        this.userId = params.id;
      });
  }

  ngOnInit() {
    this._userService
      .getUser(this.userId)
      // .getUser(this._authService.getUser()._id)
      .subscribe((res) => {
        this.user = res;
        // if (this._authService.isAdmin()) {
        //   // 2018.03.31 - 20:43:40 - every profile belongs to admin :)
        //   this.isMyProfile = true;
        // } else {
        //   // 2018.03.31 - 20:42:17 - student can only update THEIR OWN profile
        //   this.isMyProfile = this._authService.getStudent()._id === this.studentId;
        // }
      });

  }

}
