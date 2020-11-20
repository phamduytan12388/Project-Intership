import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordActiveRoutingModule } from './record-active-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecordActiveComponent } from './record-active.component';



@NgModule({
  declarations: [RecordActiveComponent],
  imports: [
    CommonModule,
    SharedModule,
    RecordActiveRoutingModule
  ]
})
export class RecordActiveModule { }
