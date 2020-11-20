import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementStatisticRoutingModule } from './management-statistic-routing.module';
import { ShrimpPeriodReportComponent } from './shrimp-period-report/shrimp-period-report.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ShrimpPeriodReportComponent, ShrimpPeriodReportComponent],
  imports: [
    CommonModule,
    SharedModule,
    ManagementStatisticRoutingModule
  ]
})
export class ManagementStatisticModule { }
