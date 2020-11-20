import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmPopupComponent } from './popups/confirm-popup/confirm-popup.component';
import { NotificationPopupComponent } from './popups/notification-popup/notification-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule, NzFormModule } from 'ng-zorro-antd';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { CreateUserGroupPopupComponent } from './popups/create-user-group-popup/create-user-group-popup.component';
import { ResetPasswordPopupComponent } from './popups/reset-password-popup/reset-password-popup.component';
import { CreatePasswordPopupComponent } from './popups/create-password-popup/create-password-popup.component';
import { ChooseUserGroupPopupComponent } from './popups/choose-user-group-popup/choose-user-group-popup.component';
import { ManagementFactorModalComponent } from './popups/management-factor-modal/management-factor-modal.component';
import { UpdateHistoryPopupComponent } from './popups/update-history-popup/update-history-popup.component';
import { DataFarmingLocationPopupComponent } from './popups/data-farming-location-popup/data-farming-location-popup.component';



@NgModule({
  declarations: [
    ConfirmPopupComponent,
    NotificationPopupComponent,
    CreateUserGroupPopupComponent,
    ResetPasswordPopupComponent,
    CreatePasswordPopupComponent,
    ChooseUserGroupPopupComponent,
    ManagementFactorModalComponent,
    UpdateHistoryPopupComponent,
    ImageCarouselComponent,
    DataFarmingLocationPopupComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DirectivesModule,
    PipesModule,
  ],
  exports: [
    ConfirmPopupComponent,
    NotificationPopupComponent,
    CreateUserGroupPopupComponent,
    ResetPasswordPopupComponent,
    CreatePasswordPopupComponent,
    ChooseUserGroupPopupComponent,
    ManagementFactorModalComponent,
    UpdateHistoryPopupComponent,
    ImageCarouselComponent,
    DirectivesModule,
    PipesModule
  ],
  entryComponents: [
    ConfirmPopupComponent,
    NotificationPopupComponent,
    CreateUserGroupPopupComponent,
    ResetPasswordPopupComponent,
    CreatePasswordPopupComponent,
    ChooseUserGroupPopupComponent,
    ManagementFactorModalComponent,
    UpdateHistoryPopupComponent,
  ]
})
export class ComponentModule { }
