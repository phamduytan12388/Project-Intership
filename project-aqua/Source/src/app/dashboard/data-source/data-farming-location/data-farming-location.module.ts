import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataFarmingLocationComponent } from './data-farming-location.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataFarmingLocationRoutingModule } from './data-farming-location-routing.module';
import { DataFarmingLocationListComponent } from './data-farming-location-list/data-farming-location-list.component';

@NgModule({
  declarations: [DataFarmingLocationComponent, DataFarmingLocationListComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataFarmingLocationRoutingModule
  ],
})
export class DataFarmingLocationModule { }	
