import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ChooseHarvestComponent } from './choose-harvest/choose-harvest.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [HeaderComponent, ChooseHarvestComponent],
  imports: [
    CommonModule,
    NzCheckboxModule,
    NzTableModule,
    NzModalModule
  ],
  exports: [
    HeaderComponent,
    ChooseHarvestComponent
  ]
})
export class ComponentsModule { }
