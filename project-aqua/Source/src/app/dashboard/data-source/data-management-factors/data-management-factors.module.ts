import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataManagementFactorsComponent } from './data-management-factors.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataManagementFactorsRoutingModule } from './data-management-factors-routing.module';
import { DataManagementFactorsListComponent } from './data-management-factors-list/data-management-factors-list.component';

@NgModule({
  declarations: [DataManagementFactorsComponent, DataManagementFactorsListComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataManagementFactorsRoutingModule
  ],
})
export class DataManagementFactorsModule { }
