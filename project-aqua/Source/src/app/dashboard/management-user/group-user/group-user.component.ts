import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserGroupFilter } from 'src/app/shared/models/user-group/user-group-filter.model';
import { UserGroup } from 'src/app/shared/models/user-group/user-group.model';
import { UserService } from 'src/app/shared/services/user.service';
import { debounceTime } from 'rxjs/operators';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { ConfirmPopupComponent} from 'src/app/shared/component/popups/confirm-popup/confirm-popup.component';
import { CreateUserGroupPopupComponent } from 'src/app/shared/component/popups/create-user-group-popup/create-user-group-popup.component';
import { ETypeForm } from 'src/app/shared/enums/type-form';
import { NotificationPopupComponent } from 'src/app/shared/component/popups/notification-popup/notification-popup.component';

@Component({
  selector: 'app-group-user',
  templateUrl: './group-user.component.html',
  styleUrls: ['./group-user.component.scss']
})
export class GroupUserComponent implements OnInit {
  searchTerm$ = new BehaviorSubject<string>('');
  userGroupData: UserGroup[];
  filterModel = new UserGroupFilter();
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  eTypeForm = ETypeForm;
  isCheckboxAll: boolean;
  constructor(
    private userService: UserService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.searchTerm$.pipe(debounceTime(600)).subscribe(_ => {
      this.filterModel.searchKey = this.searchTerm$.value;
      this.pageIndex = 1;
      this.filter();
    });
  }

  filter(pageIndex?: number): void {
    const filter = { ...this.filterModel };
    this.userService.getListUserGroup(
      pageIndex ? pageIndex : 1,
      this.pageSize,
      filter
    ).subscribe(result => {
      this.userGroupData = result.items;
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

  delete(itemUserGroup?: UserGroup): void {
    if (
      (itemUserGroup && itemUserGroup.countUsers > 0) ||
      ( !itemUserGroup &&
        this.userGroupData.filter(item => item.isChecked).length &&
        this.userGroupData.filter(item => item.isChecked).some(item => item.countUsers > 0))
    ) {
      const modalNoti = this.modalService.create({
        nzContent: ConfirmPopupComponent,
        nzComponentParams: {
          title: 'Thông báo',
          vnContent: 'Những người dùng liên quan đến nhóm bị xóa sẽ được cập nhập nhóm người dùng'
        }
      });
      modalNoti.afterClose.subscribe(result => {
        if (result && result.data) {
         this.confirmDelete(itemUserGroup);
        }
      });
      return;
    }
    this.confirmDelete(itemUserGroup);
  }

  confirmDelete(itemUserGroup?: UserGroup): void {
    if (
      !itemUserGroup &&
      !this.userGroupData.filter(item => item.isChecked).length
    ) {
      const modalNoti = this.modalService.create({
        nzContent: NotificationPopupComponent,
        nzComponentParams: {
          title: 'Thông báo',
          vnContent: 'Vui lòng chọn nhóm người dùng cần xóa'
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
          groups: itemUserGroup ? [itemUserGroup.id] : this.userGroupData.filter(item => item.isChecked).map(item => item.id)
        };
        this.userService.deleteUserGroup(model).subscribe(res => {
          this.notification.success(
            'Thông báo (Notification)', 'Xóa nhóm người dùng thành công!'
          );
          this.filter();
        });
      }
    });
  }

  createOrEdit(item: UserGroup, typeForm: ETypeForm): void {
    const modal = this.modalService.create({
      nzContent: CreateUserGroupPopupComponent,
      nzComponentParams: {
        userGroup: item ? item : new UserGroup(),
        type: typeForm,
      }
    });
    modal.afterClose.subscribe(result => {
      if (result && result.isSuccess) {
        this.filter();
      }
    });
  }

  choosedAll(): void {
    this.userGroupData.filter(item1 => !item1.isDefault).forEach(item => {
      item.isChecked = this.isCheckboxAll;
    });
  }

  changeCheckItem(): void {
    this.isCheckboxAll = this.userGroupData.filter(item1 => !item1.isDefault).every(item => item.isChecked);
  }
}
