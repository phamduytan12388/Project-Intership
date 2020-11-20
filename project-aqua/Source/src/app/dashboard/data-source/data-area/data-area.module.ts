import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAreaComponent } from './data-area.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataAreaRoutingModule } from './data-area-routing.module';
import { DataAreaListComponent } from './data-area-list/data-area-list.component';

@NgModule({
  declarations: [DataAreaComponent, DataAreaListComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataAreaRoutingModule
  ],
})
export class DataAreaModule { }
