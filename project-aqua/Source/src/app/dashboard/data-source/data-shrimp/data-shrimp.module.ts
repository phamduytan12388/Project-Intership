import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataShrimpComponent } from './data-shrimp.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataShrimpRoutingModule } from './data-shrimp-routing.module';
import { DataShrimpListComponent } from './data-shrimp-list/data-shrimp-list.component';

@NgModule({
  declarations: [
    DataShrimpComponent,
    DataShrimpListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DataShrimpRoutingModule
  ],
})
export class DataShrimpModule { }
