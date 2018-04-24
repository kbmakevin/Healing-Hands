import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { UserService } from '../../user.service';
import { User, Motivation } from '../../app.interface';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../alert/alert.service';

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
  // used only if nurse is viewing this page
  nurseHasMotivatedPatient: Boolean;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _alertService: AlertService,
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
        if (this.authService.isNurse()) {
          this.nurseHasMotivatedPatient = false;
          for (let index = 0; index < this.patient.receivedMotivation.length; index++) {
            console.log('author:', this.patient.receivedMotivation[index].author);
            console.log('auth nurse id:', this.authService.getUser()._id);
            if ('' + (this.patient.receivedMotivation[index].author) === this.authService.getUser()._id) {
              // console.log('i authored this!');
              this.nurseHasMotivatedPatient = true;
            }
          }
        }
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
      console.log('motivation is: ', this.createdMotivation);
    } else {
      this._userService.sendMotivation(this.createdMotivation).subscribe(data => {
        this._alertService.success(`Motivation has been sent to ${this.createdMotivation.patient.name}`, false);
      },
        err => {
          this._alertService.error(err.message);
          console.log(err);
        });
    }
  }
}
