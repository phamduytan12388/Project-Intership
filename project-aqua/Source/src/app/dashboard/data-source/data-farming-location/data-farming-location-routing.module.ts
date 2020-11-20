import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataFarmingLocationComponent } from './data-farming-location.component';
import { DataFarmingLocationListComponent } from './data-farming-location-list/data-farming-location-list.component';
const routes: Routes = [
  {
    path: '',
    component: DataFarmingLocationComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: DataFarmingLocationListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataFarmingLocationRoutingModule { }
