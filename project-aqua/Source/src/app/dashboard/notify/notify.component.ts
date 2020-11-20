import { Component, OnInit } from '@angular/core';
import { NotiService } from 'src/app/shared/services/noti.service';
import { NotificationItem } from 'src/app/shared/models/notification/notification-item';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ConfirmPopupComponent } from 'src/app/shared/component/popups/confirm-popup/confirm-popup.component';
import { Router } from '@angular/router';
import Utils from 'src/app/shared/helpers/utils.helper';
import { NzModalService } from 'ng-zorro-antd';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ENotifyStatus } from 'src/app/shared/constant/notify-status';
import { DatePipe } from '@angular/common';
import { EFrequency } from 'src/app/shared/constant/frequency';
import { ENotificationStatus } from 'src/app/shared/constant/notification-status';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BehaviorSubject, Subject } from 'rxjs';
@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
  providers: [DatePipe],
})
export class NotifyComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  notificationData: NotificationItem[];
  countUnread: number;
  eNotificationStatus = ENotificationStatus;
  constructor(
    private notiService: NotificationService,
    private spinnerService: SpinnerService,
    private modalService: NzModalService,
    private router: Router,
    private datePipe: DatePipe,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.filter();
  }

  filter(pageIndex?: number): void {
    this.spinnerService.isGetNotify = false;
    this.notiService
      .getListNotification(pageIndex ? pageIndex : 1, this.pageSize)
      .subscribe(result => {
        this.notificationData = this.mappingNotifyContent(result.items);
        this.countUnread = (this.notificationData || []).filter(item => item.status !== this.eNotificationStatus.READ).length;
        this.total = result.total;
        this.pageIndex = result.currentPage + 1;
      });
  }

  markAll(): void {
    this.notiService.markAllNotification().subscribe(res => {
      this.notificationData.forEach(item => {
        item.status = 'Read';
      });
    });
  }


  mark(item: NotificationItem): void {
    if (item.status === 'New') {
      this.notiService.markNotification(item.id).subscribe(res => {
        item.status = 'Read';
        this.countUnread = this.countUnread - 1;
      });
    }
  }


  changePageSize(event: number): void {
    this.pageSize = event;
    this.pageIndex = 1;
    this.filter();
  }

  changePageIndex(event: number): void {
    this.filter(event);
  }

  readItem(item: NotificationItem): any {
    this.mark(item);
    const userModel = this.authenticationService.getAuthenticationModel();
    if (item.type.code === ENotifyStatus.NOTIFY && item.frequency.code === EFrequency.DAILY) {
      // tslint:disable-next-line:max-line-length
      return this.router.navigate(['/dashboard/record-active/note-book/list'], { queryParams: { fromDate: new Date(item.fromDate * 1000).setHours(0, 0, 0, 0), toDate: new Date(item.toDate * 1000).setHours(23, 59, 59, 999), curator: userModel.userId, locationId: item.farmingLocation && item.farmingLocation.id, shrimpCropId:  item.shrimpCrop && item.shrimpCrop.id, notify: Math.floor(Math.random() * 100) } });
    }
    // tslint:disable-next-line:max-line-length
    return this.router.navigate(['/dashboard/record-active/note-book/list'], { queryParams: { fromDate: new Date(item.executionTime * 1000).setHours(0, 0, 0, 0), toDate: new Date(item.executionTime * 1000).setHours(23, 59, 59, 999), curator: userModel.userId, locationId: item.farmingLocation && item.farmingLocation.id, shrimpCropId: item.shrimpCrop && item.shrimpCrop.id, notify: Math.floor(Math.random() * 100) } });
  }

  mappingNotifyContent(data: NotificationItem[]): NotificationItem[] {
    data.forEach((item) => {
      switch (item.type.code) {
        case ENotifyStatus.REMIND:
          item.title = `Nhắc nhở: Thực hiện ghi nhận ${item.managementFactor && item.managementFactor.name} cho ${item.shrimpCrop && item.shrimpCrop.name}`;
          item.message = `Thực hiện ghi nhận ${item.managementFactor && item.managementFactor.name} cho ${item.shrimpCrop && item.shrimpCrop.name} tại ${
            item.farmingLocation && item.farmingLocation.name
            } vào lúc ${this.datePipe.transform(
              item.executionTime * 1000,
              'hh:mm a'
            )} ngày ${this.datePipe.transform(
              item.executionTime * 1000,
              'dd/MM/yyyy '
            )}`;
          break;
        default:
          if (item.frequency.code === EFrequency.DAILY) {
            item.title = `Thông báo: Có công việc ghi nhận ${item.managementFactor && item.managementFactor.name} mới cho ${item.shrimpCrop && item.shrimpCrop.name}`;
            item.message = `Công việc ghi nhận ${item.managementFactor && item.managementFactor.name} tại ${
              item.farmingLocation && item.farmingLocation.name
              } cho ${item.shrimpCrop && item.shrimpCrop.name} vào lúc ${this.datePipe.transform(
                item.executionTime * 1000,
                'hh:mm a'
              )} từ ngày ${this.datePipe.transform(
                item.fromDate * 1000,
                'dd/MM/yyyy'
              )} đến ngày ${this.datePipe.transform(
                item.toDate * 1000,
                'dd/MM/yyyy'
              )}`;
          } else {
            item.title = `Thông báo: Có công việc ghi nhận ${item.managementFactor && item.managementFactor.name} mới cho ${item.shrimpCrop && item.shrimpCrop.name}`;
            item.message = `Công việc ghi nhận ${item.managementFactor && item.managementFactor.name} tại ${
              item.farmingLocation && item.farmingLocation.name
              } cho ${item.shrimpCrop && item.shrimpCrop.name} vào lúc ${this.datePipe.transform(
                item.executionTime * 1000,
                'hh:mm a'
              )} ngày ${this.datePipe.transform(
                item.executionTime * 1000,
                ' dd/MM/yyyy'
              )}`;
          }
          break;
      }
    });
    return data;
  }



}
