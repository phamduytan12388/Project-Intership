import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserHawaComponent } from './create-user-hawa/create-user-hawa.component';
import { EditUserHawaComponent } from './edit-user-hawa/edit-user-hawa.component';
import { FormUserHawaComponent } from './form-user-hawa/form-user-hawa.component';
import { InfoUserComponent } from './info-user.component';
import { ViewUserHawaComponent } from './view-user-hawa/view-user-hawa.component';

const routes: Routes = [
  {
    path: '', component: InfoUserComponent,
    children: [
      { path: '', redirectTo: 'formUser', pathMatch: 'full' },
      { path: 'formUser', component: FormUserHawaComponent },
      { path: 'createUser', component: CreateUserHawaComponent },
      { path: 'editUser', component: EditUserHawaComponent },
      { path: 'viewUser', component: ViewUserHawaComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoUserRoutingModule { }
