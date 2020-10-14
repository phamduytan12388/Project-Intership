import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { FormEmployeeComponent } from './employee/form-employee/form-employee.component';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ManageEmployeeComponent } from './employee/manage-employee/manage-employee.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';
import { EmployeeModule } from './employee/employee.module';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    FormEmployeeComponent,
    ManageEmployeeComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent,
    ViewEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    EmployeeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
