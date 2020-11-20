import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from './component/component.module';
import { NgZorroAntdModule, NzI18nService, NzTableModule, NzEmptyModule, NzBadgeModule } from 'ng-zorro-antd';
import { ChartsModule } from '@carbon/charts-angular';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,
    NgZorroAntdModule,
    NzTableModule,
    NzEmptyModule,
    NzBadgeModule,
    ChartsModule,
    NzBadgeModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,
    NgZorroAntdModule,
    NzTableModule,
    NzEmptyModule,
    NzBadgeModule,
    ChartsModule,
    NzBadgeModule
  ],
  providers: [NzI18nService],
})
export class SharedModule { }
