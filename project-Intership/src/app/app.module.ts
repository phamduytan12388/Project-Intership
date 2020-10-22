import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeModule } from './employee/employee.module';
import { LoginModule } from './login/login.module';
import { GuardService } from './guard.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    EmployeeModule,
    ReactiveFormsModule,
    LoginModule
  ],
  providers: [GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
