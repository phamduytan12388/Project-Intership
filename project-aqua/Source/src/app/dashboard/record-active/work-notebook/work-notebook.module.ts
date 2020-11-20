import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkNotebookComponent } from './work-notebook.component';
import { WorkNotebookListComponent } from './work-notebook-list/work-notebook-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkNotebookRoutingModule } from './work-notebook-routing.module';



@NgModule({
  declarations: [WorkNotebookComponent, WorkNotebookListComponent],
  imports: [
    CommonModule,
    SharedModule,
    WorkNotebookRoutingModule
  ]
})
export class WorkNotebookModule { }
