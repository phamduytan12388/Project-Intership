import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { ChooseHarvestComponent } from './components/choose-harvest/choose-harvest.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
  ],
  exports: [
    ComponentsModule,
  ],
  entryComponents: [
    ChooseHarvestComponent,
  ]
})
export class SharedModule { }
