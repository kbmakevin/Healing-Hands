import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { routing } from '../app.routing';

@NgModule({
  imports: [
    CommonModule,
    routing,
  ],
  declarations: [DetailsComponent, ListComponent],
  providers: [
    UserService
  ]
})
export class UserModule { }
