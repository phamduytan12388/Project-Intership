import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataShrimpComponent } from './data-shrimp.component';
import { DataShrimpListComponent } from './data-shrimp-list/data-shrimp-list.component';

const routes: Routes = [
  {
    path: '',
    component: DataShrimpComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: DataShrimpListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataShrimpRoutingModule { }
