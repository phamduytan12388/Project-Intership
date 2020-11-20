import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './authentication.service';
import { ApplicationService } from './aplication.service';
import { NzModalService, NzI18nService } from 'ng-zorro-antd';
import { ReadingJsonService } from './reading-json.service';
import { RoleService } from './role.service';
import { UserService } from './user.service';
import { FileService } from './file.service';
import { EventEmitterService } from './event-emitter.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ApplicationService,
    AuthenticationService,
    UserService,
    ReadingJsonService,
    RoleService,
    NzModalService,
    NzI18nService,
    FileService,
    EventEmitterService
  ]
})
export class ServicesModule { }
