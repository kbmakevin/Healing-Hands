import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { EmergencyService } from './emergency.service';
import { User, EmergencyAlert } from '../app.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.css']
})
export class EmergencyComponent implements OnInit {

  title = 'Emergency Component';
  nurses: User[];
  user: User;
  sent:boolean = false;
  alert: EmergencyAlert = {
    sender: null,
    receiver: null,
    message: ''
  }
  message: string;
  nurseId: String;

  constructor(private authService: AuthenticationService, private emergService: EmergencyService, private _router: Router) {
      this.user = this.authService.getUser();
   }

  ngOnInit() {
       this.emergService.listUsers().subscribe(nurses => {
      this.nurses = nurses.filter(patient => patient.type === 'nurse');
    });
  }

  nurseSelect(id) {
    console.log(id);
    this.nurseId = id;
  }

  alertText(text) {
    console.log(text);
    this.message = text;
  }

  submitAlert() {
    this.alert = {
      sender: this.user,
      receiver: this.nurses.find(n => n._id == this.nurseId),
      message: this.message
    }

    console.log(this.alert);
    this.emergService.submitAlert(this.alert).subscribe((emerg) => {
      if(emerg != null) {
        this.sent = true;
      }
    }, (err) => {
      console.error(err);
    });
  }
}
