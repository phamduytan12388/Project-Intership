import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { EmployeeComponent } from './employee/employee.component';
import { FormEmployeeComponent } from './employee/form-employee/form-employee.component';
import { ManageEmployeeComponent } from './employee/manage-employee/manage-employee.component';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';
import { GuardService } from './guard.service';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/employee', pathMatch: 'full' },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(mod => mod.EmployeeModule),
    canActivate: [GuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
