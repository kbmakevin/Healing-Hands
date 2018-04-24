import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { UserService } from '../../user.service';
import { User, Motivation } from '../../app.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patients-details',
  templateUrl: './patients-details.component.html',
  styleUrls: ['./patients-details.component.css']
})
export class PatientsDetailsComponent implements OnInit {

  patient: User;
  patientId: string;
  showAddMotivationForm: Boolean;
  createdMotivation: Motivation = {
    author: undefined,
    patient: undefined,
    message: '',
    type: ''

  };
  constructor(
    private _activatedRoute: ActivatedRoute,
    public authService: AuthenticationService,
    private _userService: UserService) {
    this._activatedRoute.queryParams
      .subscribe(params => {
        this.patientId = params.id;
      });
  }

  ngOnInit() {
    this.showAddMotivationForm = false;

    this._userService
      .getUser(this.patientId)
      // .getUser(this._authService.getUser()._id)
      .subscribe((res) => {
        this.patient = res;
        // if (this._authService.isAdmin()) {
        //   // 2018.03.31 - 20:43:40 - every profile belongs to admin :)
        //   this.isMyProfile = true;
        // } else {
        //   // 2018.03.31 - 20:42:17 - student can only update THEIR OWN profile
        //   this.isMyProfile = this._authService.getStudent()._id === this.studentId;
        //
      });

  }

  toggleAddMotivationForm() {
    this.showAddMotivationForm = !this.showAddMotivationForm;
  }

  sendMotivation(motivationMsg: any, motivationType: any) {
    this.createdMotivation.author = this.authService.getUser();
    this.createdMotivation.patient = this.patient;
    this.createdMotivation.message = motivationMsg.value;
    this.createdMotivation.type = motivationType.value;

    // dont send motivation to api if missing criteria
    if (!this.createdMotivation.author ||
      !this.createdMotivation.patient ||
      !this.createdMotivation.message ||
      !this.createdMotivation.type) {
      console.log('ERROR: something is missing in the created motivation!');
    }
    console.log('motivation is: ', this.createdMotivation);
  }
}
