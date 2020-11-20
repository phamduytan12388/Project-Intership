import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { forkJoin } from 'rxjs';
import { ConfirmPopupComponent } from 'src/app/shared/component/popups/confirm-popup/confirm-popup.component';
import { ENUserStatus } from 'src/app/shared/constant/user-status';
import { ETypeForm } from 'src/app/shared/enums/type-form';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import { MustMatch } from 'src/app/shared/helpers/must-match.validator';
import Utils from 'src/app/shared/helpers/utils.helper';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { DictionaryItem } from 'src/app/shared/models/dictionary/dictionary-item.model';
import { AddressMasterData } from 'src/app/shared/models/master-data/address-master-data';
import { UserGroup } from 'src/app/shared/models/user-group/user-group.model';
import { User } from 'src/app/shared/models/user/user.model';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { UserService } from 'src/app/shared/services/user.service';
import { CreateUserGroupPopupComponent } from 'src/app/shared/component/popups/create-user-group-popup/create-user-group-popup.component';
import { CryptoUtil } from 'src/app/shared/helpers/crypto.helper';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() type: string;
  @Input() id: string;
  userForm: FormGroup;
  user = new User();
  userGroupsData: UserGroup[] = [];
  countryData: AddressMasterData[];
  provinceData: AddressMasterData[];
  districtData: AddressMasterData[];
  communeData: AddressMasterData[];
  userStatus = ENUserStatus;
  typeForm = ETypeForm;
  formErrors = {
    userName: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    reTypeNewPassword: '',
    mustMatch: '',
  };
  isSubmitted: boolean;
  invalidMessages: string[];
  get address(): string {
    if (!this.userForm) {
      return '';
    }
    const valueForm = this.userForm.value;
    return Utils.address([
      valueForm.address,
      valueForm.commune && valueForm.commune.value,
      valueForm.district && valueForm.district.value,
      valueForm.province && valueForm.province.value,
    ]);
  }
  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private router: Router,
    private notification: NzNotificationService,
    private masterDataService: MasterDataService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.id) {
      forkJoin(
        this.masterDataService.addressMaster,
        this.userService.getAllUserGroups(),
        this.userService.getUserDetail(this.id)
      ).subscribe(([res1, res2, res3]) => {
        this.countryData = res1;
        this.provinceData = this.masterDataService.getProvince(1, res1);
        this.userGroupsData = res2;
        this.user = res3;
        this.districtData = this.masterDataService.getDistrict(
          parseInt(this.user.province && this.user.province.key, 0),
          this.provinceData
        );
        this.communeData = this.masterDataService.getCommune(
          parseInt(this.user.district && this.user.district.key, 0),
          this.districtData
        );
        this.createForm();
      });
    }
    if (!this.id) {
      forkJoin(
        this.masterDataService.addressMaster,
        this.userService.getAllUserGroups()
      ).subscribe(([res1, res2]) => {
        this.countryData = res1;
        this.provinceData = this.masterDataService.getProvince(1, res1);
        this.userGroupsData = res2;
        this.createForm();
      });
    }
  }
  createForm(): void {
    this.userForm = this.fb.group(
      {
        id: this.id,
        userName: [this.user.userName, [CustomValidator.required, CustomValidator.loginNameFormat]],
        password: [
          this.user.password,
          [CustomValidator.required, CustomValidator.passwordULN],
        ],
        reTypeNewPassword: [
          this.user.password,
          [CustomValidator.required, CustomValidator.passwordULN],
        ],
        group: [this.user.group],
        fullName: [this.user.fullName, CustomValidator.required],
        email: [
          this.user.email,
          [CustomValidator.required, CustomValidator.email],
        ],
        phone: [this.user.phone, [CustomValidator.phoneNumber]],
        country: this.user.country,
        province: this.user.province,
        district: this.user.district,
        commune: this.user.commune,
        address: this.user.address,
        isActive: this.user.isActive ? this.user.isActive : true,
      },
      {
        validator: MustMatch('password', 'reTypeNewPassword'),
      }
    );

    this.userForm.valueChanges.subscribe((_) => {
      this.onFormValueChanged();
    });
  }

  onFormValueChanged(): void {
    if (this.isSubmitted) {
      this.validateForm();
    }
  }
  submit(): void {
    this.isSubmitted = true;
    if (this.validateForm()) {
      this.userService
        .createOrUpdateUser(
          this.mappingModelCallAPI(this.userForm.getRawValue())
        )
        .subscribe((res) => {
          this.router.navigate(['/dashboard/manage-user/user/']);
        });
    }
  }

  mappingModelCallAPI(formValue): User {
    return {
      id: this.id,
      userName: formValue.userName,
      password: this.id ? null : CryptoUtil.hashMessage(formValue.password),
      group: formValue.group,
      isActive: formValue.isActive,
      fullName: formValue.fullName,
      email: formValue.email,
      phone: formValue.phone,
      province:
        formValue.province &&
        new DictionaryItem(
          formValue.province && formValue.province.key.toString(),
          formValue.province && formValue.province.value,
          formValue.province && formValue.province.value,
          formValue.province && formValue.province.code
        ),
      district:
        formValue.district &&
        new DictionaryItem(
          formValue.district && formValue.district.key.toString(),
          formValue.district && formValue.district.value,
          formValue.district && formValue.district.value,
          formValue.district && formValue.district.code
        ),
      commune:
        formValue.commune &&
        new DictionaryItem(
          formValue.commune && formValue.commune.key.toString(),
          formValue.commune && formValue.commune.value,
          formValue.commune && formValue.commune.value,
          formValue.commune && formValue.commune.code
        ),
      address: formValue.address,
      modifiedAt: this.user && this.user.modifiedAt,
    };
  }

  validateForm(): boolean {
    if (this.type === this.typeForm.edit) {
      delete this.formErrors.reTypeNewPassword;
      delete this.formErrors.password;
      delete this.formErrors.mustMatch;
    }
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.userForm,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }
  changeStatus(event): void {
    const modal = this.modalService.create({
      nzContent: ConfirmPopupComponent,
      nzComponentParams: {
        title: 'Xác nhận',
        vnContent: this.userForm.getRawValue().isActive
          ? `Bạn có chắc muốn ngưng hoạt động cho người dùng ${
          this.userForm.getRawValue().userName ? this.userForm.getRawValue().userName : ''
          } này không?`
          : `Bạn có chắc muốn kích hoạt hoạt động cho người dùng  ${
          this.userForm.getRawValue().userName ? this.userForm.getRawValue().userName : ''
          } này không?`,
      },
    });
    modal.afterClose.subscribe((result) => {
      if (result && result.data) {
        switch (this.userForm.getRawValue().isActive) {
          case true: {
            this.userForm.get('isActive').patchValue(false);
            break;
          }
          default: {
            this.userForm.get('isActive').patchValue(true);

            break;
          }
        }
      }
    });
  }
  compareDataNZSelectUserGroup(itemOne, itemTwo): boolean {
    return itemOne && itemTwo
      ? itemOne.id.toString() === itemTwo.id.toString()
      : itemOne === itemTwo;
  }
  compareDataNZSelect(itemOne, itemTwo): boolean {
    return itemOne && itemTwo
      ? +itemOne.code === +itemTwo.code
      : itemOne === itemTwo;
  }
  changeCountry(event): void {
    this.userForm.get('province').patchValue(null);
    this.userForm.get('district').patchValue(null);
    this.userForm.get('commune').patchValue(null);
    this.communeData = null;
    if (!event) {
      this.provinceData = null;
      return;
    }
    this.provinceData = this.masterDataService.getProvince(
      event ? event.key : null,
      this.countryData
    );
  }
  changeProvince(event): void {
    this.userForm.get('district').patchValue(null);
    this.userForm.get('commune').patchValue(null);
    this.communeData = null;
    if (!event) {
      this.districtData = null;
      return;
    }
    this.districtData = this.masterDataService.getDistrict(
      event ? event.key : null,
      this.provinceData
    );
  }
  changeDistrict(event): void {
    this.userForm.get('commune').patchValue(null);
    if (!event) {
      this.communeData = null;
      return;
    }
    this.communeData = this.masterDataService.getCommune(
      event ? event.key : null,
      this.districtData
    );
  }

  createUserGroup(): void {
    const modal = this.modalService.create({
      nzContent: CreateUserGroupPopupComponent,
      nzComponentParams: {
        userGroup: new UserGroup(),
        type: ETypeForm.create
      }
    });
    modal.afterClose.subscribe(result => {
      if (result && result.isSuccess) {
        this.userService.getAllUserGroups().subscribe(res => {
          this.userGroupsData = res;
        });
      }
    });
  }
}
