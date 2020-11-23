import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardService } from './shared/guard/guard.service';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
    canActivate: [GuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  //   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  //   {
  //     path: 'dashboard',
  //     component: DashboardComponent,
  //   },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
