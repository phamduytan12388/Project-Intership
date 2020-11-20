import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NotifyComponent } from './notify/notify.component';
import { RecordActiveComponent } from './record-active/record-active.component';
import { ManagementStatisticComponent } from './management-statistic/management-statistic.component';


@NgModule({
  declarations: [DashboardComponent, NotifyComponent, ManagementStatisticComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
