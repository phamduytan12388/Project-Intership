import { Component, OnInit } from '@angular/core';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { FormGroup, FormBuilder } from '@angular/forms';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import { MustMatch } from 'src/app/shared/helpers/must-match.validator';
import { NzModalService, NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-password-popup.component.html',
  styleUrls: ['./reset-password-popup.component.scss']
})
export class ResetPasswordPopupComponent implements OnInit {
  formChangePass: FormGroup;
  formErrors = {
    password: '',
    newPassword: '',
    reTypeNewPassword: '',
    mustMatch: ''
  };
  isSubmitted = false;
  invalidMessages: string[];
  isSubmitSuccess = false;
  account: any;
  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private notification: NzNotificationService,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formChangePass = this.fb.group(
      {
        password: [null, [CustomValidator.required]],
        newPassword: [null, [CustomValidator.required, CustomValidator.passwordULN]],
        reTypeNewPassword: [null, [CustomValidator.required, CustomValidator.passwordULN]]
      },
      {
        validator: MustMatch('newPassword', 'reTypeNewPassword')
      }
    );
    this.formChangePass.valueChanges.subscribe(data => {
      this.onFormValueChanged();
    });
  }

  validateForm(): boolean {
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.formChangePass,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.validateForm()) {
      this.userService.changePassword(
        this.authenticationService.getAuthenticationModel().id,
        this.formChangePass.getRawValue().password,
        this.formChangePass.getRawValue().newPassword
      ).subscribe(_ => {
        this.notification.success('Thông báo', 'Thay đổi mật khẩu thành công!');
        this.closePopup();
      })
    }
  }

  onFormValueChanged(): void {
    if (this.isSubmitted) {
      this.validateForm();
    }
  }

  closePopup(): void {
    this.modal.destroy({});
  }
}
