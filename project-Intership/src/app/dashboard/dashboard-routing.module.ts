import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from '../shared/guard/guard.service';
import { DashboardComponent } from './dashboard.component';
import { ProfileManagementModule } from './profile-management/profile-management.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile-management',
        pathMatch: 'full'
      },
      {
        path: 'info-user',
        loadChildren: () => import('./info-user/info-user.module').then(mod => mod.InfoUserModule),
      },
      {
        path: 'profile-management',
        loadChildren: () => import('./profile-management/profile-management.module').then(mod => mod.ProfileManagementModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
