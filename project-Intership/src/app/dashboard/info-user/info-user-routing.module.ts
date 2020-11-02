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
      { path: '', redirectTo: 'form-user', pathMatch: 'full' },
      { path: 'form-user', component: FormUserHawaComponent },
      { path: 'create-user', component: CreateUserHawaComponent },
      { path: 'edit-user', component: EditUserHawaComponent },
      { path: 'view-user', component: ViewUserHawaComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoUserRoutingModule { }
