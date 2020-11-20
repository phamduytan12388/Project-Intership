import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import ErrorMessageHelper from 'src/app/shared/helpers/error-message.helper';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  formForgotPass: FormGroup;
  errorMessage: string;
  dataError;
  formErrors = {
    email: '',
  };
  isSubmitted = false;
  invalidMessages: string[];
  isSubmitSuccess = false;
  error: string;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: NzModalService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formForgotPass = this.fb.group({
      email: [null, [CustomValidator.required, CustomValidator.email]],
    });
    this.formForgotPass.valueChanges.subscribe((data) => {
      this.onFormValueChanged();
    });
  }

  validateForm(): boolean {
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.formForgotPass,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.validateForm()) {
      // this.userService
      //   .forgotPassword(this.formForgotPass.controls.email.value)
      //   .subscribe(
      //     res => {
      //       if (res.status === false) {
      //         this.errorMessage = ErrorMessageHelper.getInvalidMessages(
      //           res.error.code
      //         );
      //       } else {
      //         this.isSubmitSuccess = true;
      //       }
      //       // this.spinnerService.hide();
      //     },
      //     err => {
      //       // this.spinnerService.hide();
      //     }
      //   );
    }
  }

  onFormValueChanged(): void {
    if (this.isSubmitted) {
      this.validateForm();
    }
  }
}
