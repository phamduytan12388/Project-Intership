import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeriodCreateComponent } from './period-create/period-create.component';
import { PeriodEditComponent } from './period-edit/period-edit.component';
import { PeriodListComponent } from './period-list/period-list.component';
import { ShrimpPeriodInformationComponent } from './shrimp-period-information.component';

const routes: Routes = [
  {
    path: '',
    component: ShrimpPeriodInformationComponent,
    data: {
      breadcrumb: 'Quản lý thông tin nuôi trồng',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'edit/:id',
        component: PeriodEditComponent,
        data: {
          breadcrumb: 'Chỉnh sửa đợt nuôi tôm',
        },
      },
      {
        path: 'create',
        component: PeriodCreateComponent,
        data: {
          breadcrumb: 'Tạo mới đợt nuôi tôm',
        },
      },
      {
        path: 'list',
        component: PeriodListComponent,
        data: {
          breadcrumb: 'Danh sách',
        },
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShrimpPeriodInformationRoutingModule { }
