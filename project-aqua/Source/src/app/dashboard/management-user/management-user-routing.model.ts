import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementUserComponent } from './management-user.component';
import { GroupUserComponent } from './group-user/group-user.component';

const routes: Routes = [
    {
        path: '',
        component: ManagementUserComponent,
        data: {
            breadcrumb: 'Quản lý người dùng',
        },
        children: [
            {
                path: '',
                redirectTo: 'group',
                pathMatch: 'full'
            },
            {
                path: 'group',
                component: GroupUserComponent,
                data: {
                    breadcrumb: 'Nhóm người dùng',
                },
            },
            {
                path: 'user',
                loadChildren: () =>
                    import('./user/user.module').then(
                        mod => mod.UserModule
                    ),
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagementUserRoutingModule { }
