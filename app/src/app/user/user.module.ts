import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DetailsComponent],
  providers: [
    UserService
  ]
})
export class UserModule { }
