import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from '../guard.service';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeComponent } from './employee.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

const routes: Routes = [
 {
    path: '', component: EmployeeComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ManageEmployeeComponent },
      { path: 'view/:id', component: ViewEmployeeComponent },
      { path: 'edit/:id', component: EditEmployeeComponent },
      { path: 'create', component: CreateEmployeeComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
