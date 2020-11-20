import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { forkJoin } from 'rxjs';
import { ETypeForm } from 'src/app/shared/enums/type-form';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { DataFactor } from 'src/app/shared/models/data-source/data-factor/data-factor.model';
import { Unit } from 'src/app/shared/models/data-source/data-factor/unit.model';
import { DictionaryItem } from 'src/app/shared/models/dictionary/dictionary-item.model';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { MasterDataService } from 'src/app/shared/services/master-data.service';

@Component({
  selector: 'app-management-factor-modal',
  templateUrl: './management-factor-modal.component.html',
  styleUrls: ['./management-factor-modal.component.scss'],
})
export class ManagementFactorModalComponent implements OnInit {
  @Input() id: string;
  @Input() type: ETypeForm;
  eTypeForm = ETypeForm;
  factorData = new DataFactor();
  form: FormGroup;
  formErrors = {
    name: '',
    group: '',
    dataType: '',
  };
  isSubmitted = false;
  invalidMessages: string[];
  isSubmitSuccess = false;
  groupFactorsData: DictionaryItem[] = [];
  listDataType: DictionaryItem[] = [];
  listUnitData: Unit[] = [];
  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private notification: NzNotificationService,
    private dataSourceService: DataSourceService,
    private masterDataService: MasterDataService
  ) {}

  ngOnInit(): void {
    if (this.type === this.eTypeForm.create) {
      forkJoin(
        this.masterDataService.getMasterData('FactorGroup,FactorDataType'),
        this.dataSourceService.getMeasureUnit()
      ).subscribe(([res1, res2]) => {
        this.groupFactorsData = res1.find(
          (item) => item.groupName === 'FactorGroup'
        ).childs;
        this.listDataType = res1.find(
          (item) => item.groupName === 'FactorDataType'
        ).childs;
        this.listUnitData = res2;
        this.createForm();
      });
      return;
    }
    forkJoin(
      this.masterDataService.getMasterData('FactorGroup,FactorDataType'),
      this.dataSourceService.getFactorDetail(this.id),
      this.dataSourceService.getMeasureUnit()
    ).subscribe(([res1, res2, res3]) => {
      this.groupFactorsData = res1.find(
        (item) => item.groupName === 'FactorGroup'
      ).childs;
      this.listDataType = res1.find(
        (item) => item.groupName === 'FactorDataType'
      ).childs;
      this.factorData = res2;
      this.listUnitData = res3;
      this.createForm();
    });
  }

  createForm(): void {
    this.form = this.fb.group({
      code: [this.factorData.code],
      name: [this.factorData.name, [CustomValidator.required]],
      group: [this.factorData.factorGroup, [CustomValidator.required]],
      dataType: [this.factorData.dataType, [CustomValidator.required]],
      sampleValue: [this.factorData.sampleValue],
      description: [this.factorData.description],
      unit: [this.factorData.unit]
    });
    if (
      this.form.getRawValue().dataType &&
      this.form.getRawValue().dataType.code.toString() === 'YesOrNo'
    ) {
      this.form.get('sampleValue').disable();
    }
    this.form.valueChanges.subscribe((data) => {
      this.onFormValueChanged();
    });
  }

  validateForm(): boolean {
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.form,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.validateForm()) {
      this.dataSourceService
        .createOrUpdateFactor(this.mappingModel())
        .subscribe((_) => {
          this.modal.destroy({ isSuccess: true });
          this.notification.success(
            'Thông báo',
            this.type === this.eTypeForm.create
              ? 'Tạo mới yếu tố quản lý thành công'
              : 'Cập nhật yếu tố quản lý thành công'
          );
        });
    }
  }

  mappingModel(): DataFactor {
    return {
      id: this.factorData.id,
      code: this.form.getRawValue().code,
      name: this.form.getRawValue().name,
      factorGroup: this.form.getRawValue().group,
      dataType: this.form.getRawValue().dataType,
      sampleValue: this.form.getRawValue().sampleValue,
      description: this.form.getRawValue().description,
      modifiedAt: this.factorData && this.factorData.modifiedAt,
      unit: this.form.getRawValue().unit
    };
  }

  onFormValueChanged(): void {
    if (this.isSubmitted) {
      this.validateForm();
    }
  }

  closePopup(): void {
    this.modal.destroy({});
  }

  compareDataNZSelect(itemOne, itemTwo): boolean {
    return itemOne && itemTwo
      ? itemOne.code.toString() === itemTwo.code.toString()
      : itemOne === itemTwo;
  }

  compareDataNZSelectUnit(itemOne, itemTwo): boolean {
    return itemOne && itemTwo
      ? itemOne.id.toString() === itemTwo.id.toString()
      : itemOne === itemTwo;
  }

  changeDataType(event): void {
    if (event && event.code.toString() === 'YesOrNo') {
      this.form.get('sampleValue').disable();
      return;
    }
    this.form.get('sampleValue').enable();
  }
}
