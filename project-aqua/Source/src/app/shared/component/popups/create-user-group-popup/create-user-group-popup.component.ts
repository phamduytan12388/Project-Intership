import { forkJoin } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalRef, NzNotificationService, TransferDirection, TransferItem } from 'ng-zorro-antd';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { UserGroup } from 'src/app/shared/models/user-group/user-group.model';
import { UserService } from 'src/app/shared/services/user.service';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { Feature } from 'src/app/shared/models/feature/feature.model';
import { ETypeForm } from 'src/app/shared/enums/type-form';
@Component({
  selector: 'app-create-user-group-popup',
  templateUrl: './create-user-group-popup.component.html',
  styleUrls: ['./create-user-group-popup.component.scss']
})
export class CreateUserGroupPopupComponent implements OnInit {
  @Input() userGroup: UserGroup;
  @Input() type: ETypeForm;
  eTypeForm = ETypeForm;
  formCreate: FormGroup;
  formErrors = {
    name: '',
    description: ''
  };
  isSubmitted = false;
  invalidMessages: string[];
  isSubmitSuccess = false;
  listFeaturesShow: TransferItem[] = [];
  featuresData: Feature[] = [];
  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private notification: NzNotificationService,
    private userService: UserService,
    private masterDataService: MasterDataService
  ) { }

  ngOnInit(): void {
   if (this.type === this.eTypeForm.create) {
    this.masterDataService.getAllFeatures().subscribe(res => {
      this.featuresData = res;
      this.listFeaturesShow = this.mappingFeaterModel(res);
      this.createForm();
    });
    return;
   }
   forkJoin(
    this.userService.getUserGroupDetail(this.userGroup.id),
    this.masterDataService.getAllFeatures()
  ).subscribe(([res1, res2]) => {
    this.userGroup = res1;
    this.featuresData = res2;
    this.listFeaturesShow = this.mappingFeaterModel(res2);
    this.createForm();
  });
  }

  mappingFeaterModel(data: Feature[]): TransferItem[] {
    return data.map(item => {
      return {
        key: item.id,
        title: item.name,
        direction: (this.userGroup.features && this.userGroup.features.map(i => i.id) || []).includes(item.id) ? 'right' : 'left',
        description: item.description,
        checked: false
      };
    });
  }

  createForm(): void {
    this.formCreate = this.fb.group(
      {
        name: [this.userGroup ? this.userGroup.name : '', [CustomValidator.required]],
        description: [this.userGroup ? this.userGroup.description : '', [CustomValidator.required]],
      },
    );
    this.formCreate.valueChanges.subscribe(data => {
      this.onFormValueChanged();
    });
  }

  validateForm(): boolean {
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.formCreate,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.validateForm()) {
      this.userService.createOrUpdateUserGroup(this.mappingModel()).subscribe(_ => {
        this.modal.destroy({ isSuccess: true });
        this.notification.success('Thông báo', this.type === this.eTypeForm.create ? 'Tạo mới nhóm người dùng thành công' : 'Cập nhật nhóm người dùng thành công');
      });
    }
  }

  mappingModel(): UserGroup {
    return {
      id: this.userGroup.id,
      name: this.formCreate.getRawValue().name,
      description: this.formCreate.getRawValue().description,
      features: this.listFeaturesShow.filter(item => item.direction === 'right').map(item => {
        return {
          id: item.key,
          name: item.title,
          description: item.description,
        };
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

  filterOption(inputValue: string, item: any): boolean {
    return item.description.indexOf(inputValue) > -1;
  }

  mappingModelTransfer(data: Feature[], direct: TransferDirection): TransferItem[] {
    return data.map(item => {
      return {
        key: item.id,
        title: item.name,
        direction: direct,
        description: item.description,
        checked: false
      };
    });
  }

  transferAllToLeft(): void {
    if (this.checkEmptyFeature('right')) {
      this.listFeaturesShow = this.mappingModelTransfer((this.featuresData || []), 'left' );
    }
    return;
  }

  transferAllToRight(): void {
    if (this.checkEmptyFeature('left')) {
      this.listFeaturesShow = this.mappingModelTransfer((this.featuresData || []), 'right' );
    }
    return;
  }

  checkEmptyFeature(direct: TransferDirection): boolean {
    return ((this.listFeaturesShow || []).filter(item => item.direction === direct ).length) > 0;
  }
}
