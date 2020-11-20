import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataAreaComponent } from './data-area.component';
import { DataAreaListComponent } from './data-area-list/data-area-list.component';

const routes: Routes = [
  {
    path: '',
    component: DataAreaComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: DataAreaListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataAreaRoutingModule { }	
