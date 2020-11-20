import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkNotebookListComponent } from './work-notebook-list/work-notebook-list.component';
import { WorkNotebookComponent } from './work-notebook.component';


const routes: Routes = [
    {
        path: '',
        component: WorkNotebookComponent,
        data: {
            breadcrumb: 'Quản lý công việc ghi nhận',
        },
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'list',
                component: WorkNotebookListComponent,
                data: {
                    breadcrumb: 'Danh sách',
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkNotebookRoutingModule { }
