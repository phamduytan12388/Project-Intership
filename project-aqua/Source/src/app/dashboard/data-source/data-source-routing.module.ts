import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataSourceComponent } from './data-source.component';

const routes: Routes = [
  {
    path: '',
    component: DataSourceComponent,
    data: {
      breadcrumb: 'Dữ liệu nguồn',
    },
    children: [
      {
        path: '',
        redirectTo: 'area',
        pathMatch: 'full'
      },
      {
        path: 'area',
        loadChildren: () =>
          import('./data-area/data-area.module').then(
            mod => mod.DataAreaModule
          ),
        data: {
          breadcrumb: 'Khu vực',
        },
      },
      {
        path: 'farming-location',
        loadChildren: () =>
          import('./data-farming-location/data-farming-location.module').then(
            mod => mod.DataFarmingLocationModule
          ),
        data: {
          breadcrumb: 'Vị trí nuôi trồng',
        },
      },
      {
        path: 'management-factors',
        loadChildren: () =>
          import('./data-management-factors/data-management-factors.module').then(
            mod => mod.DataManagementFactorsModule
          ),
        data: {
          breadcrumb: 'Giống tôm',
        },
      },
      {
        path: 'shrimp',
        loadChildren: () =>
          import('./data-shrimp/data-shrimp.module').then(
            mod => mod.DataShrimpModule
          ),
        data: {
          breadcrumb: 'Yếu tố quản lý',
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataSourceRoutingModule { }
