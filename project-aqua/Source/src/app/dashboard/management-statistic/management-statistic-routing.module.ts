import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementStatisticComponent } from './management-statistic.component';
import { ShrimpPeriodReportComponent } from './shrimp-period-report/shrimp-period-report.component';


const routes: Routes = [
  {
      path: '',
      component: ManagementStatisticComponent,
      data: {
          breadcrumb: 'Báo cáo thống kê',
      },
      children: [
          {
              path: '',
              redirectTo: 'shrimp-period-report',
              pathMatch: 'full'
          },
          {
              path: 'shrimp-period-report',
              component: ShrimpPeriodReportComponent,
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementStatisticRoutingModule { }
