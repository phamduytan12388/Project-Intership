import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoUserRoutingModule } from './info-user-routing.module';
import { InfoUserComponent } from './info-user.component';
import { FormUserHawaComponent } from './form-user-hawa/form-user-hawa.component';
import { CreateUserHawaComponent } from './create-user-hawa/create-user-hawa.component';
import { EditUserHawaComponent } from './edit-user-hawa/edit-user-hawa.component';
import { ViewUserHawaComponent } from './view-user-hawa/view-user-hawa.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';


@NgModule({
  declarations: [
    InfoUserComponent,
    FormUserHawaComponent,
    CreateUserHawaComponent,
    EditUserHawaComponent,
    ViewUserHawaComponent],
  imports: [
    CommonModule,
    InfoUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzDatePickerModule
  ],
  exports: [
    FormUserHawaComponent
  ]
})
export class InfoUserModule { }
