import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: {
      breadcrumb: 'Người dùng',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'edit/:id',
        component: UserEditComponent,
        data: {
          breadcrumb: 'Chỉnh sửa',
        },
      },
      // {
      //   path: 'view/:id',
      //   component: UserViewComponent
      // },
      {
        path: 'create',
        component: UserCreateComponent,
        data: {
          breadcrumb: 'Tạo mới',
        },
      },
      {
        path: 'list',
        component: UserListComponent,
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
export class UserRoutingModule { }
