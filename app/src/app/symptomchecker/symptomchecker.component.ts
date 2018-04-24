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
  results: boolean = false;
  symptoms = {
    sniffling: '',
    aching: '',
    coughing: '',
    highFever: ''
  };

  possibleCondition = {};

  influenza: String = '';
  constructor(private authService: AuthenticationService, private sympService: SymptomcheckerService) {
      this.results = false;
      this.user = this.authService.getUser();
  }

  ngOnInit() {
  }

  checksymptoms() {
    this.sympService.getMedicalConditions(this.symptoms).subscribe((res) => {
      this.results = true;
      this.possibleCondition = res;
    }, (err) => {
      console.error(err);
    });
  }

}
