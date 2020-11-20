import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShrimpPeriodInformationRoutingModule } from './shrimp-period-information-routing.module';
import { PeriodListComponent } from './period-list/period-list.component';
import { PeriodEditComponent } from './period-edit/period-edit.component';
import { PeriodCreateComponent } from './period-create/period-create.component';
import { PeriodFormComponent } from './period-form/period-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShrimpPeriodInformationComponent } from './shrimp-period-information.component';
import { FactorFormGroupComponent } from './factor-form-group/factor-form-group.component';


@NgModule({
  declarations: [PeriodListComponent, PeriodEditComponent, PeriodCreateComponent, PeriodFormComponent, ShrimpPeriodInformationComponent, FactorFormGroupComponent],
  imports: [
    CommonModule,
    SharedModule,
    ShrimpPeriodInformationRoutingModule
  ]
})
export class ShrimpPeriodInformationModule { }
