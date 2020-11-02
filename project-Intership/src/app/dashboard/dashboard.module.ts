import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeModule } from '../employee/employee.module';
import { InfoUserModule } from './info-user/info-user.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HideButtonDirective } from '../shared/directives/hide-button.directive';

@NgModule({
  declarations: [
    DashboardComponent,
    HideButtonDirective
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    InfoUserModule,
    NzMenuModule,
  ]
})
export class DashboardModule { }
