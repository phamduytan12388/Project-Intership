import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementUserComponent } from './management-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagementUserRoutingModule } from './management-user-routing.model';
import { GroupUserComponent } from './group-user/group-user.component';
@NgModule({
  declarations: [
    ManagementUserComponent,
    GroupUserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ManagementUserRoutingModule,
  ]
})
export class ManagementUserModule { }
