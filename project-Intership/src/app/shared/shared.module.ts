import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { HideButtonDirective } from './directives/hide-button.directive';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    ComponentsModule,
  ]
})
export class SharedModule { }
