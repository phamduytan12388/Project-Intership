import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HaverstRegistrationViewComponent } from './haverst-registration-view/haverst-registration-view.component';
import { HaverstRegistrationListComponent } from './haverst-registration-list/haverst-registration-list.component';
import { HaverstRegistrationComponent } from './haverst-registration/haverst-registration.component';
import { ProfileManagementComponent } from './profile-management.component';

const routes: Routes = [
  {
    path: '', component: ProfileManagementComponent,
    children: [
      { path: '', redirectTo: 'haverst-registration-list', pathMatch: 'full' },
      { path: 'haverst-registration', component: HaverstRegistrationComponent },
      { path: 'haverst-registration-list', component: HaverstRegistrationListComponent },
      { path: 'haverst-registration-view/:id', component: HaverstRegistrationViewComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileManagementRoutingModule { }
