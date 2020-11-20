import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  NzModalRef,
  NzNotificationService,
  NzModalService,
} from 'ng-zorro-antd';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { UserGroup } from 'src/app/shared/models/user-group/user-group.model';
import { UserService } from 'src/app/shared/services/user.service';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-choose-user-group-popup',
  templateUrl: './choose-user-group-popup.component.html',
  styleUrls: ['./choose-user-group-popup.component.scss'],
})
export class ChooseUserGroupPopupComponent implements OnInit {
  @Input() group = new UserGroup();
  @Input() id: string;
  userGroupsData: UserGroup[] = [];
  form: FormGroup;
  isSubmitted = false;
  invalidMessages: string[];
  formErrors = {
    group: '',
  };
  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUserGroups().subscribe((res) => {
      this.userGroupsData = res;
    });
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      group: [this.group, CustomValidator.required],
    });
    this.form.valueChanges.subscribe((data) => {
      this.onFormValueChanged();
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.validateForm()) {
      const model = {
        userId: this.id,
        groupId: this.form.getRawValue().group.id,
      };
      this.userService.changeUserGroup(model).subscribe((res) => {
        this.notification.success(
          'Thông báo (Notification)',
          'Thay đổi nhóm thành công!'
        );
        this.modal.destroy({ isSuccess: true });
      });
    }
  }

  validateForm(): boolean {
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.form,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }
  onFormValueChanged(): void {
    if (this.isSubmitted) {
      this.validateForm();
    }
  }

  closePopup(): void {
    this.modal.destroy({});
  }

  compareDataNZSelectUserGroup(itemOne, itemTwo): boolean {
    return itemOne && itemTwo
      ? itemOne.id.toString() === itemTwo.id.toString()
      : itemOne === itemTwo;
  }
}
