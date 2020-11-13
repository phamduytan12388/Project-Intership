import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileManagementComponent } from './profile-management.component';
import { ProfileManagementRoutingModule } from './profile-management-routing.module';
import { HaverstRegistrationComponent } from './haverst-registration/haverst-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { HaverstRegistrationListComponent } from './haverst-registration-list/haverst-registration-list.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HaverstRegistrationViewComponent } from './haverst-registration-view/haverst-registration-view.component';
import { HideButtonDirective } from 'src/app/shared/directives/hide-button.directive';

@NgModule({
  declarations: [
    ProfileManagementComponent,
    HaverstRegistrationComponent,
    HaverstRegistrationListComponent,
    HaverstRegistrationViewComponent,
    HideButtonDirective],
  imports: [
    CommonModule,
    ProfileManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzRadioModule,
    NzDatePickerModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzSelectModule,
    NzInputModule,
    NzIconModule
  ],
  exports: [
    HaverstRegistrationComponent,
    HaverstRegistrationListComponent
  ],
})
export class ProfileManagementModule { }
