import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserFilter } from 'src/app/shared/models/user/user-filter.model';
import { User } from 'src/app/shared/models/user/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { debounceTime } from 'rxjs/operators';
import { UserGroup } from 'src/app/shared/models/user-group/user-group.model';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { ConfirmPopupComponent } from 'src/app/shared/component/popups/confirm-popup/confirm-popup.component';
import { ENUserStatus } from 'src/app/shared/constant/user-status';
import { ChooseUserGroupPopupComponent } from 'src/app/shared/component/popups/choose-user-group-popup/choose-user-group-popup.component';
import { CreatePasswordPopupComponent } from 'src/app/shared/component/popups/create-password-popup/create-password-popup.component';
import { NotificationPopupComponent } from 'src/app/shared/component/popups/notification-popup/notification-popup.component';
import { CryptoUtil } from 'src/app/shared/helpers/crypto.helper';
import Utils from 'src/app/shared/helpers/utils.helper';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  searchTerm$ = new BehaviorSubject<string>('');
  userData: User[] = [];
  filterModel = new UserFilter();
  userGroupData: UserGroup[] = [];
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  userStatus = ENUserStatus;
  checkboxSelectAll: boolean;
  currentUser: AuthenticationModel;
  constructor(
    private userService: UserService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getAuthenticationModel();
    this.userService.getAllUserGroups().subscribe((res) => {
      this.userGroupData = res;
    });
    this.searchTerm$.pipe(debounceTime(600)).subscribe((_) => {
      this.filterModel.searchKey = this.searchTerm$.value;
      this.pageIndex = 1;
      this.filter();
    });
  }

  filter(pageIndex?: number): void {
    const filter = { ...this.filterModel };
    this.userService
      .getListUser(pageIndex ? pageIndex : 1, this.pageSize, filter)
      .subscribe((result) => {
        this.userData = result.items;
        this.total = result.total;
        this.pageIndex = result.currentPage + 1;
      });
  }



  changPageSize(event: number): void {
    this.pageSize = event;
    this.pageIndex = 1;
    this.filter();
  }

  changePageIndex(event: number): void {
    this.filter(event);
  }

  getUserStatus(item: boolean): string {
    if (item === true) {
      return 'Active';
    }
    return 'Inactive';
  }
  delete(userItem?: User): void {
    if (
      !userItem &&
      !this.userData.filter(item => item.checkboxSelected).length
    ) {
      const modalNoti = this.modalService.create({
        nzContent: NotificationPopupComponent,
        nzComponentParams: {
          title: 'Thông báo',
          vnContent: 'Vui lòng chọn người dùng cần xóa'
        }
      });
      return;
    }
    const modal = this.modalService.create({
      nzContent: ConfirmPopupComponent,
      nzComponentParams: {
        title: 'Thông báo',
        vnContent: 'Bạn có chắc muốn xóa dữ liệu này không?'
      }
    });
    modal.afterClose.subscribe(result => {
      if (result && result.data) {
        const model = {
          ids: userItem ? [userItem.id] : this.userData.filter(item => item.checkboxSelected).map(item => item.id)
        };
        this.userService.deleteUser(model).subscribe(res => {
          this.notification.success(
            'Thông báo (Notification)', 'Xóa người dùng thành công!'
          );
          this.filter();
        });
      }
    });
  }

  changeActive(data: User): void {
    const requestModel = {
      id: data.id,
      modifiedAt: data.modifiedAt,
      isActive: !data.isActive,
    };
    const modal = this.modalService.create({
      nzContent: ConfirmPopupComponent,
      nzComponentParams: {
        title: 'XÁC NHẬN',
        // tslint:disable-next-line: max-line-length
        vnContent:
          data.isActive === true
            ? `Bạn có chắc muốn ngưng hoạt động người dùng ${
            data && data.userName
            } này?`
            : `Bạn có chắc muốn kích hoạt hoạt động người dùng  ${
            data && data.userName
            } này? `,
      },
    });
    modal.afterClose.subscribe((result) => {
      if (result && result.data) {
        this.userService.changeStatusUser(requestModel).subscribe(
          (res) => {
            this.notification.success(
              'Thông báo',
              'Cập nhật trạng thái người dùng thành công'
            );
            this.filter();
          },
          (err) => {
            this.notification.error(
              'Thông báo',
              'Cập nhật trạng thái người dùng không thành công. Vui lòng thử lại!'
            );
            this.filter();
          }
        );
      }
    });
  }


  createNewPassword(item: User): void {
    const modal = this.modalService.create({
      nzContent: ConfirmPopupComponent,
      nzComponentParams: {
        title: 'XÁC NHẬN',
        vnContent: 'Bạn có muốn tái tạo mật khẩu mới cho tài khoản này không?',
      },
    });
    modal.afterClose.subscribe((result) => {
      if (result && result.data) {
        const newPass = Utils.regenerativePassword();
        const requestModel = {
          userId: item.id,
          password: CryptoUtil.hashMessage(newPass),
        };
        this.userService.resetPassword(requestModel).subscribe(
          (res1) => {
            item.modifiedAt = res1.data.modifiedAt;
            this.notification.success(
              'Thông báo',
              'Tái tạo mật khẩu mới thành công!'
            );
            const modalCreate = this.modalService.create({
              nzContent: CreatePasswordPopupComponent,
              nzComponentParams: {
                password: newPass
              }
            });
            modalCreate.afterClose.subscribe((res) => {
              if (res && res.data.isSuccess) {
                this.notification.success(
                  'Thông báo',
                  'Sao chép mật khẩu thành công!'
                );
              }
            });
          },
          (err) => {
            this.notification.error(
              'Thông báo',
              'Tái tạo mật khẩu mới không thành công!'
            );
          }
        );




      }
    });
  }
  changeUserGroup(user: User): void {
    const modal = this.modalService.create({
      nzContent: ChooseUserGroupPopupComponent,
      nzComponentParams: {
        id: user && user.id,
        group: user && user.group,
      },
    });
    modal.afterClose.subscribe(result => {
      if (result && result.isSuccess) {
        this.filter();
      }
    });
  }

  changeDeActive(): void {
    if (
      !this.userData.filter(item => item.checkboxSelected).length
    ) {
      const modalNoti = this.modalService.create({
        nzContent: NotificationPopupComponent,
        nzComponentParams: {
          title: 'Thông báo',
          vnContent: 'Vui lòng chọn người dùng cần vô hiệu hóa'
        }
      });
      return;
    }
    const modal = this.modalService.create({
      nzContent: ConfirmPopupComponent,
      nzComponentParams: {
        title: 'Thông báo',
        vnContent: 'Bạn có chắc muốn thay đổi trạng thái của những người dùng này không?'
      }
    });
    modal.afterClose.subscribe(result => {
      if (result && result.data) {
        const model = {
          userIds: this.userData.filter(item => item.checkboxSelected).map(item => item.id)
        };
        this.userService.changeDeActive(model).subscribe(res => {
          this.notification.success(
            'Thông báo (Notification)', 'Thay đổi trạng thái thành công!'
          );
          this.filter();
        });
      }
    });
  }

  onSelectAll(value: boolean): void {
    (this.userData || []).filter(item => item.id !== this.currentUser.id).forEach((x) => (x.checkboxSelected = value));
  }

  changCheckAll(): void {
    this.checkboxSelectAll = (this.userData || []).filter(item => item.id !== this.currentUser.id).every(
      (item) => item.checkboxSelected
    );
  }
}
