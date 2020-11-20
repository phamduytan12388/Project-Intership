import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataSourceRoutingModule } from './data-source-routing.module';
import { DataSourceComponent } from './data-source.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataShrimpComponent } from './data-shrimp/data-shrimp.component';


@NgModule({
  declarations:[
    DataSourceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DataSourceRoutingModule
  ]
})
export class DataSourceModule { }
