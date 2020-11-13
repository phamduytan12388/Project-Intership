import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeModule } from '../employee/employee.module';
import { InfoUserModule } from './info-user/info-user.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ProfileManagementModule } from './profile-management/profile-management.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    InfoUserModule,
    ProfileManagementModule,
    NzMenuModule,
  ]
})
export class DashboardModule { }
