import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NotifyComponent } from './notify/notify.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'record-active',
        pathMatch: 'full'
      },
      {
        path: 'data-source',
        loadChildren: () =>
          import('./data-source/data-source.module').then(
            mod => mod.DataSourceModule
          ),
      },
      {
        path: 'manage-user',
        loadChildren: () =>
          import('./management-user/management-user.module').then(
            mod => mod.ManagementUserModule
          ),
      },
      {
        path: 'notify',
        component: NotifyComponent,
      },
      {
        path: 'record-active',
        loadChildren: () =>
          import('./record-active/record-active.module').then(
            mod => mod.RecordActiveModule
          ),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('./management-statistic/management-statistic.module').then(
            mod => mod.ManagementStatisticModule
          ),
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
