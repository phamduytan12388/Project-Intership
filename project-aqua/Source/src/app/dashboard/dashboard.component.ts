import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import DateTimeConvertHelper from '../shared/helpers/datetime-convert-helper';
import { BaseComponent } from '../shared/component/base-component';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RoleService } from '../shared/services/role.service';
import * as moment from 'moment';
import { AuthenticationModel } from '../shared/models/auth/authentication.model';
import { IBreadCrumb } from '../shared/models/master-data/breadcrumb.interface';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { ConfirmPopupComponent } from '../shared/component/popups/confirm-popup/confirm-popup.component';
import { ResetPasswordPopupComponent } from '../shared/component/popups/reset-password-popup/reset-password-popup.component';
import { NzNotificationService } from 'ng-zorro-antd';
import { NotificationItem } from '../shared/models/notification/notification-item';
import { NotiService } from '../shared/services/noti.service';
import Utils from '../shared/helpers/utils.helper';
import { UserService } from '../shared/services/user.service';
import { NotificationService } from '../shared/services/notification.service';
import { MasterDataService } from '../shared/services/master-data.service';
import { DictionaryItem } from '../shared/models/dictionary/dictionary-item.model';
import { ENotifyStatus } from '../shared/constant/notify-status';
import { DatePipe } from '@angular/common';
import { EFrequency } from '../shared/constant/frequency';
import { SpinnerService } from '../shared/services/spinner.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  currentYear = moment().year();
  user: AuthenticationModel;
  public breadcrumbs: IBreadCrumb[];
  countNotify: number;
  isVisibleNotify: boolean;
  notificationData: NotificationItem[];
  notifyStatusData: DictionaryItem[] = [];
  constructor(
    private authenticationService: AuthenticationService,
    public router: Router,
    private modalService: NzModalService,
    public roleService: RoleService,
    private notification: NzNotificationService,
    private activatedRoute: ActivatedRoute,
    private notiService: NotificationService,
    private userService: UserService,
    private masterDataService: MasterDataService,
    private spinnerService: SpinnerService,
    private datePipe: DatePipe,
  ) {
    super(router, roleService);
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit(): void {
    this.notiService.getListNotification(1, 10).subscribe((res) => {
      this.notificationData = this.mappingNotifyContent(res.items);
      this.countNotify = res.extraData && res.extraData.countNew ? res.extraData.countNew : 0;
    });
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe((_) => {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      });
    this.masterDataService.getMasterData('NotifyType').subscribe((res) => {
      this.notifyStatusData = res.find(
        (item) => item.groupName === 'NotifyType'
      ).childs;
    });
    this.user = this.authenticationService.getAuthenticationModel();
    this.getInterval();
  }

  routerBackHome(): void {
    this.router.navigate(['/']);
  }
  logout(): void {
    const modal = this.modalService.create({
      nzContent: ConfirmPopupComponent,
      nzComponentParams: {
        title: 'ĐĂNG XUẤT',
        vnContent: 'Bạn có chắc muốn đăng xuất không?',
      },
    });
    modal.afterClose.subscribe((result) => {
      if (result && result.data) {
        this.authenticationService.logOut();
      }
    });
  }
  changePassword(): void {
    const modal = this.modalService.create({
      nzContent: ResetPasswordPopupComponent,
    });
    modal.afterClose.subscribe((result) => {
      if (result && result.data) {
        this.notification.success('Thông báo', 'Thay đổi mật khẩu thành công!');
      }
    });
  }

  getNotification(): void {
    this.notiService.getListNotification(1, 10).subscribe(res => {
      this.notificationData = this.mappingNotifyContent(res.items);
      this.countNotify =
        res.extraData && res.extraData.countNew ? res.extraData.countNew : 0;
    });
  }

  getInterval(): void {
    const self = this;
    setInterval(() => {
      if (!self.authenticationService.getAuthenticationModel()) {
        return;
      }
      self.spinnerService.isGetNotify = true;
      self.getNotification();
    }, 1 * 60 * 1000);
  }

  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: IBreadCrumb[] = []
  ): IBreadCrumb[] {
    const label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data.breadcrumb
        : '';
    const path =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';
    // const lastRoutePart = path.split('/').pop();
    // const isDynamicRoute = lastRoutePart.startsWith(':');
    // if (isDynamicRoute && !!route.snapshot) {
    //   const paramName = lastRoutePart.split(':')[1];
    //   path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
    //   label = route.snapshot.params[paramName];
    // }
    const nextUrl = path ? `${url}/${path}` : url;
    const breadcrumb: IBreadCrumb = {
      label,
      url: nextUrl,
    };
    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

  // Notification
  closeNoti(): void {
    this.isVisibleNotify = false;
  }

  viewAllNoti(): void {
    this.isVisibleNotify = false;
    this.router.navigate(['/dashboard/notify']);
  }

  mark(item: NotificationItem): void {
    if (item.status === 'New') {
      this.notiService.markNotification(item.id).subscribe((_) => {
        item.status = 'Read';
      });
    }
  }

  readItem(item: NotificationItem): any {
    this.mark(item);
    this.isVisibleNotify = false;
    const userModel = this.authenticationService.getAuthenticationModel();
    if (item.type.code === ENotifyStatus.NOTIFY && item.frequency.code === EFrequency.DAILY) {
      // tslint:disable-next-line:max-line-length
      return this.router.navigate(['/dashboard/record-active/note-book/list'],
      // tslint:disable-next-line: max-line-length
      { queryParams: { fromDate: new Date(item.fromDate * 1000).setHours(0, 0, 0, 0), toDate: new Date(item.toDate * 1000).setHours(23, 59, 59, 999)
        // tslint:disable-next-line: max-line-length
        , curator: userModel.userId, locationId: item.farmingLocation && item.farmingLocation.id, shrimpCropId: item.shrimpCrop && item.shrimpCrop.id, notify: Math.floor(Math.random() * 100) } });
    }
    // tslint:disable-next-line:max-line-length
    return this.router.navigate(['/dashboard/record-active/note-book/list'], 
    // tslint:disable-next-line: max-line-length
    { queryParams: { fromDate: new Date(item.executionTime * 1000).setHours(0, 0, 0, 0), toDate: new Date(item.executionTime * 1000).setHours(23, 59, 59, 999)
      // tslint:disable-next-line: max-line-length
      , curator: userModel.userId, locationId: item.farmingLocation && item.farmingLocation.id, shrimpCropId: item.shrimpCrop && item.shrimpCrop.id, notify: Math.floor(Math.random() * 100) } });
  }

  mappingNotifyContent(data: NotificationItem[]): NotificationItem[] {
    data.forEach((item) => {
      switch (item.type.code) {
        case ENotifyStatus.REMIND:
          item.title = `Nhắc nhở: Thực hiện ghi nhận ${item.managementFactor && item.managementFactor.name}`;
          item.message = `Thực hiện ghi nhận ${item.managementFactor && item.managementFactor.name} tại ${item.farmingLocation && item.farmingLocation.name
            } vào lúc ${this.datePipe.transform(
              item.executionTime * 1000,
              'hh:mm a'
            )} ngày ${this.datePipe.transform(
              item.executionTime * 1000,
              'dd/MM/yyyy'
            )}`;
          break;
        default:
          if (item.frequency.code === EFrequency.DAILY) {
            item.title = `Thông báo: Có công việc ghi nhận ${item.managementFactor && item.managementFactor.name} mới`;
            item.message = `Công việc ghi nhận ${item.managementFactor && item.managementFactor.name} tại ${item.farmingLocation && item.farmingLocation.name
              } vào lúc ${this.datePipe.transform(
                item.executionTime * 1000,
                'hh:mm a'
              )} từ ngày ${this.datePipe.transform(
                item.fromDate * 1000,
                'dd/MM/yyyy'
              )}  đến ngày ${this.datePipe.transform(
                item.toDate * 1000,
                'dd/MM/yyyy'
              )}`;
          } else {
            item.title = `Thông báo: Có công việc ghi nhận ${item.managementFactor && item.managementFactor.name} mới`;
            item.message = `Công việc ghi nhận ${item.managementFactor && item.managementFactor.name} tại ${item.farmingLocation && item.farmingLocation.name
              } vào lúc ${this.datePipe.transform(
                item.executionTime * 1000,
                'hh:mm a'
              )} ngày ${this.datePipe.transform(
                item.executionTime * 1000,
                'dd/MM/yyyy'
              )}`;
          }
          break;
      }
    });
    return data;
  }

  readNotification(): void {
    this.userService.readNotify().subscribe(_ => {
      this.countNotify = 0;
    });
  }
}
