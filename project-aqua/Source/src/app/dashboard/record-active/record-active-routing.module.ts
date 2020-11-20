import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordActiveComponent } from './record-active.component';


const routes: Routes = [
  {
    path: '',
    component: RecordActiveComponent,
    data: {
      breadcrumb: 'Hoạt động ghi nhận',
    },
    children: [
      {
        path: '',
        redirectTo: 'note-book',
        pathMatch: 'full'
      },
      {
        path: 'shrimp-period',
        loadChildren: () =>
          import('./shrimp-period-information/shrimp-period-information.module').then(
            mod => mod.ShrimpPeriodInformationModule
          ),
      },
      {
        path: 'note-book',
        loadChildren: () =>
          import('./work-notebook/work-notebook.module').then(
            mod => mod.WorkNotebookModule
          ),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordActiveRoutingModule { }
