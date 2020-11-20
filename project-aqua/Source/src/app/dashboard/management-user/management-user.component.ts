import { Component, OnInit } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { ConfirmPopupComponent } from 'src/app/shared/component/popups/confirm-popup/confirm-popup.component';
import { CreatePasswordPopupComponent } from 'src/app/shared/component/popups/create-password-popup/create-password-popup.component';
import { CreateUserGroupPopupComponent } from 'src/app/shared/component/popups/create-user-group-popup/create-user-group-popup.component';
import { NotificationPopupComponent } from 'src/app/shared/component/popups/notification-popup/notification-popup.component';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-management-user',
  templateUrl: './management-user.component.html',
  styleUrls: ['./management-user.component.scss']
})
export class ManagementUserComponent implements OnInit {

  constructor(
    private modalService: NzModalService,
    private userService: UserService,
    private notification: NzNotificationService) {
  }

  ngOnInit(): void {
  }

  openComingSoon(): void {
    this.modalService.create({
      nzContent: CreateUserGroupPopupComponent
    });
  }
}
