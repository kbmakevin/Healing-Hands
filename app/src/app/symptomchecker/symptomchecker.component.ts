import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { SymptomcheckerService } from './symptomchecker.service';
import { User } from '../app.interface';

@Component({
  selector: 'app-symptomchecker',
  templateUrl: './symptomchecker.component.html',
  styleUrls: ['./symptomchecker.component.css']
})
export class SymptomcheckerComponent implements OnInit {
  title = 'Symptom Checker Component';
  user: User;
  constructor(
    public authService: AuthenticationService) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
  }

}
