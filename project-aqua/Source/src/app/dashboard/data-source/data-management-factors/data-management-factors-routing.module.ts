import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataManagementFactorsComponent } from './data-management-factors.component';
import { DataManagementFactorsListComponent } from './data-management-factors-list/data-management-factors-list.component';

const routes: Routes = [
  {
    path: '',
    component: DataManagementFactorsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: DataManagementFactorsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataManagementFactorsRoutingModule { }	
