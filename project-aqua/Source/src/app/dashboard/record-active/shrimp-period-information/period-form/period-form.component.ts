import { Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandyDate, NzDatePickerComponent, NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { DateRangePickerComponent } from 'ng-zorro-antd/date-picker/date-range-picker.component';
import { forkJoin } from 'rxjs';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import DateTimeConvertHelper from 'src/app/shared/helpers/datetime-convert-helper';
import Utils from 'src/app/shared/helpers/utils.helper';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { DataFactor } from 'src/app/shared/models/data-source/data-factor/data-factor.model';
import { DataShrimp } from 'src/app/shared/models/data-source/data-shrimp/data-shrimp.model';
import { FarmingLocation } from 'src/app/shared/models/data-source/farming-location/farming-location.model';
import { DictionaryItem } from 'src/app/shared/models/dictionary/dictionary-item.model';
import { FactorManagement } from 'src/app/shared/models/record-active/shrimp-period/factor-management.model';
import { ShrimpPeriod } from 'src/app/shared/models/record-active/shrimp-period/shrimp-period.model';
import { User } from 'src/app/shared/models/user/user.model';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { ShrimpPeriodService } from 'src/app/shared/services/shrimp-period.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ConfirmPopupComponent } from 'src/app/shared/component/popups/confirm-popup/confirm-popup.component';
import { WorkNotebookService } from 'src/app/shared/services/work-notebook.service';

@Component({
  selector: 'app-period-form',
  templateUrl: './period-form.component.html',
  styleUrls: ['./period-form.component.scss'],
})
export class PeriodFormComponent implements OnInit {
  @Input() type: string;
  @Input() id: string;
  dateFormat = 'dd/MM/yyyy';
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
  executionTime = new Date(0, 0, 0, 0, 0, 0);
  periodForm: FormGroup;
  factorsForm: FormGroup;
  shrimpPeriod: ShrimpPeriod = new ShrimpPeriod();
  farmingLocationData: FarmingLocation[] = [];
  shrimpData: DataShrimp[] = [];
  factorData: DataFactor[] = [];
  frequencyData: DictionaryItem[] = [];
  userData: User[] = [];
  isSubmitted: boolean;
  invalidMessages: string[];
  isNewValue = false;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private shrimpPeriodService: ShrimpPeriodService,
    private dataSourceService: DataSourceService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private masterDataService: MasterDataService,
    private modalService: NzModalService,
    private workNotebookService: WorkNotebookService
    // private wor
  ) { }

  ngOnInit(): void {
    const tabSet = this.activatedRoute.snapshot.queryParamMap.get('tab');
    if (!tabSet) {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          tab: 'one',
        },
        queryParamsHandling: 'merge',
      });
    }
    if (this.id) {
      forkJoin(
        this.masterDataService.getMasterData('ShrimpCropFrequency'),
        this.shrimpPeriodService.getShrimpCropDetail(this.id),
        this.dataSourceService.getAllFactors(),
        this.dataSourceService.getAllFarmingLocation(),
        this.dataSourceService.getAllShrimpBreed(),
        this.userService.getAllUsers()
      ).subscribe(([res1, res2, res3, res4, res5, res6]) => {
        this.frequencyData = res1.find(
          item => item.groupName === 'ShrimpCropFrequency'
        ).childs;
        this.shrimpPeriod = res2;
        this.factorData = res3;
        this.farmingLocationData = res4;
        this.shrimpData = res5;
        this.userData = res6;
        this.createForm();
      });
    }
    if (!this.id) {
      forkJoin(
        this.masterDataService.getMasterData('ShrimpCropFrequency'),
        this.dataSourceService.getAllFactors(),
        this.dataSourceService.getAllFarmingLocation(),
        this.dataSourceService.getAllShrimpBreed(),
        this.userService.getAllUsers()
      ).subscribe(([res1, res2, res3, res4, res5]) => {
        this.frequencyData = res1.find(
          item => item.groupName === 'ShrimpCropFrequency'
        ).childs;
        this.factorData = res2;
        this.farmingLocationData = res3;
        this.shrimpData = res4;
        this.userData = res5;
        this.createForm();
      });
    }
  }

  createForm(): void {
    this.periodForm = this.fb.group({
      id: this.id,
      code: [this.shrimpPeriod.code],
      farmingLocation: [
        this.shrimpPeriod.farmingLocation,
        CustomValidator.required,
      ],
      name: [this.shrimpPeriod.name, CustomValidator.required],
      shrimp: [this.shrimpPeriod.shrimpBreed, CustomValidator.required],
      fromDate: [DateTimeConvertHelper.fromTimestampToDtObject(this.shrimpPeriod.fromDate), CustomValidator.required],
      toDate: [DateTimeConvertHelper.fromTimestampToDtObject(this.shrimpPeriod.toDate), CustomValidator.required],
    });
    if (this.id) {
      this.periodForm.disable();
    }
    this.factorsForm = this.fb.group({
      factors: this.fb.array((this.shrimpPeriod.factors || []).map(item => {
        const form = this.fb.group({
          id: item.id,
          managementFactor: [item.managementFactor, CustomValidator.required],
          curator: [item.curator, CustomValidator.required],
          frequency: [item.frequency, CustomValidator.required],
          // tslint:disable-next-line:max-line-length
          fromDate: [DateTimeConvertHelper.fromTimestampToDtObject(item.frequency && item.frequency.code === 'Onetime' ? item.executionTime : item.fromDate), CustomValidator.required],
          toDate: [DateTimeConvertHelper.fromTimestampToDtObject(item.toDate), CustomValidator.required],
          executionTime: [DateTimeConvertHelper.fromTimestampToDtObject(item.executionTime), CustomValidator.required],
          status: item.status,
          modifiedAt: item.modifiedAt
        });
        return form;
      })),
    });
    this.periodForm.valueChanges.subscribe((_) => {
      this.onFormValueChanged(this.periodForm);
    });
    this.factorsForm.valueChanges.subscribe((_) => {
      this.onFormValueChanged(this.factorsForm);
    });
  }

  addFactorManagementGroup(): void {
    (this.factorsForm.get('factors') as FormArray).push(this.fb.group({
      id: [null],
      managementFactor: [null, CustomValidator.required],
      curator: [null, CustomValidator.required],
      frequency: [null, CustomValidator.required],
      fromDate: [null, CustomValidator.required],
      toDate: [null, CustomValidator.required],
      executionTime: [null, CustomValidator.required],
      status: null,
      modifiedAt: null
    }));
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue) {
      return false;
    }
    return (
      new Date().setHours(0, 0, 0, 0) > startValue.getTime() ||
      (this.periodForm.get('toDate').value &&
        startValue.setHours(23, 59, 59, 999) >
        this.periodForm.get('toDate').value.setHours(0, 0, 0, 0))
    );
  }
  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue) {
      return false;
    }
    return (
      (this.periodForm.get('fromDate').value &&
        endValue.getTime() <=
        this.periodForm.get('fromDate').value.getTime()) ||
      new Date().setHours(0, 0, 0, 0) > endValue.getTime()
    );
  }

  disabledFromDate = (value: Date, factorGroup: FormGroup): boolean => {
    if (!value) {
      return false;
    }
    return (
      this.periodForm.get('fromDate').value.setHours(0, 0, 0, 0) > value.getTime()
      || this.periodForm.get('toDate').value.setHours(23, 59, 59, 999) < value.getTime()
    );
  }

  disabledToDate = (value: Date): boolean => {
    if (!value) {
      return false;
    }
    return (
      this.periodForm.get('fromDate').value.setHours(0, 0, 0, 0) > value.getTime()
      || this.periodForm.get('toDate').value.setHours(23, 59, 59, 999) < value.getTime()
    );
  }

  onFormValueChanged(formGroup): void {
    if (this.isSubmitted) {
      ValidationHelper.isValidateForm(formGroup);
    }
  }

  validateForm(formGroup: FormGroup): boolean {
    return ValidationHelper.isValidateForm(formGroup);
  }

  submit(): void {
    this.isSubmitted = true;
    if (!this.validateForm(this.periodForm)) {
      this.shrimpPeriodService
        .createOrUpdateShrimpCrop(
          this.mappingModelCallAPI(this.periodForm.getRawValue())
        )
        .subscribe(res => {
          this.notification.success(
            'Thông báo', this.id ? 'Thay đổi dữ liệu thành công!' : 'Tạo mới đợt nuôi tôm thành công'
          );
          this.router.navigate([]);
          this.router.navigate(['/dashboard/record-active/shrimp-period/edit', res['data'].id], { queryParams: { tab: 'two' } });
        });
    }
  }

  saveManagementFactor(data: { formItemFactor: FormGroup, isCreateWork: boolean }): void {
    const formItemFactor = data.formItemFactor;
    const isCreateWork = data.isCreateWork;
    if (!this.validateForm(formItemFactor)) {
      const valueItem = formItemFactor.value;
      const executionTime = new Date(valueItem.fromDate);
      executionTime.setHours(valueItem.executionTime.getHours());
      executionTime.setMinutes(valueItem.executionTime.getMinutes());
      executionTime.setSeconds(valueItem.executionTime.getSeconds());
      const requestModel = {
        id: valueItem.id,
        shrimpCropId: this.id,
        isCreateWork,
        managementFactor: valueItem.managementFactor,
        curator: valueItem.curator,
        frequency: valueItem.frequency,
        executionTime: DateTimeConvertHelper.fromDtObjectToTimestamp(executionTime),
        // tslint:disable-next-line:max-line-length
        fromDate: valueItem.frequency && valueItem.frequency.code === 'Onetime' ? null : DateTimeConvertHelper.fromDtObjectToTimestamp(valueItem.fromDate),
        // tslint:disable-next-line:max-line-length
        toDate: valueItem.frequency && valueItem.frequency.code === 'Onetime' ? null : DateTimeConvertHelper.fromDtObjectToTimestamp(valueItem.toDate),
        modifiedAt: valueItem.modifiedAt ? valueItem.modifiedAt : 0,
      };
      this.shrimpPeriodService.saveManagementFactor(requestModel).subscribe(res => {
        formItemFactor.get('id').patchValue(res.data);
        if (isCreateWork) {
          formItemFactor.get('status').patchValue(new DictionaryItem('HasWork', 'HasWork', 'HasWork', 'HasWork'));
        }
        if (!isCreateWork) {
          formItemFactor.get('status').patchValue(new DictionaryItem('New', 'New', 'New', 'New'));
        }
        this.notification.success('Thông báo', isCreateWork ? 'Lưu và sinh kế hoạch công việc thành công' : 'Lưu công việc thành công');
      });
    }

  }

  changeFrequency(factorGroup: FormGroup): void {
    if (factorGroup.get('frequency').value && factorGroup.get('frequency').value.code === 'Onetime') {
      factorGroup.get('fromDate').patchValue(null);
      factorGroup.get('toDate').patchValue(null);
      factorGroup.get('toDate').disable();
    } else {
      factorGroup.get('fromDate').patchValue(this.periodForm.get('fromDate').value);
      factorGroup.get('toDate').patchValue(this.periodForm.get('toDate').value);
      factorGroup.get('toDate').enable();
    }
  }

  compareDataNZSelectUser(itemOne, itemTwo): boolean {
    return itemOne && itemTwo
      ? itemOne.id.toString() === itemTwo.id.toString()
      : itemOne === itemTwo;
  }

  compareDataNZSelectData(itemOne, itemTwo): boolean {
    return itemOne && itemTwo
      ? itemOne.id.toString() === itemTwo.id.toString()
      : itemOne === itemTwo;
  }

  compareDataNZSelect(itemOne, itemTwo): boolean {
    return itemOne && itemTwo
      ? itemOne.code.toString() === itemTwo.code.toString()
      : itemOne === itemTwo;
  }

  mappingModelCallAPI(formValue): ShrimpPeriod {
    return {
      id: this.id,
      name: formValue.name,
      fromDate: Math.floor(formValue.fromDate.setHours(0, 0, 0, 0) / 1000),
      toDate: Math.floor(formValue.toDate.setHours(23, 59, 59, 999) / 1000),
      farmingLocation: formValue.farmingLocation,
      shrimpBreed: formValue.shrimp,
      modifiedAt: this.shrimpPeriod.modifiedAt,
    };
  }

  deleteFactorGroup(index: number): void {
    (this.factorsForm.get('factors') as FormArray).removeAt(index);
  }

  fromDateChange(toDate: any): void {
    if (!this.isNewValue) {
      this.isNewValue = true;
      setTimeout(() => {
        this.isNewValue = false;
      });
      // tslint:disable-next-line:max-line-length
      toDate.onChangeFn(toDate.nzValue && toDate.nzValue.nativeDate ? new Date(toDate.nzValue.nativeDate.setHours(0, 0, 0, 0)) : null);
    }
  }

  toDateChange(fromDate: any): void {
    if (!this.isNewValue) {
      this.isNewValue = true;
      setTimeout(() => {
        this.isNewValue = false;
      });
      // tslint:disable-next-line:max-line-length
      fromDate.onChangeFn(fromDate.nzValue && fromDate.nzValue.nativeDate ? new Date(fromDate.nzValue.nativeDate.setHours(0, 0, 0, 0)) : null);
    }
  }


  stopManagementFactor(factorGroup: FormGroup): void {
    const modal = this.modalService.create({
      nzContent: ConfirmPopupComponent,
      nzComponentParams: {
        title: 'Thông báo',
        vnContent:
          factorGroup.get('status').value.code === 'New' ? `Bạn có chắc muốn hủy ghi nhận ${factorGroup.value.managementFactor && factorGroup.value.managementFactor.name} trong đợt nuôi này?`
            : `Nếu bạn muốn ngưng ghi nhận ${factorGroup.value.managementFactor && factorGroup.value.managementFactor.name} cho đợt nuôi này, chúng tôi sẽ xóa tất cả các hoạt động chưa được ghi nhận. Bạn có chắc muốn tiếp tục?`
      }
    });
    modal.afterClose.subscribe(res => {
      if (res && res.data) {
        // tslint:disable-next-line:max-line-length
        this.workNotebookService.removeWork(factorGroup.get('id').value, factorGroup.get('status').value && factorGroup.get('status').value.code === 'New', factorGroup.value.modifiedAt).subscribe(_ => {
          this.notification.success('Thông báo', factorGroup.get('status').value.code !== 'HasWork' ? 'Hủy công việc thành công' : 'Ngưng công việc thành công');
          factorGroup.get('status').patchValue(new DictionaryItem('StopWork', 'StopWork', 'StopWork', 'StopWork'));
        });
      }
    });
  }

}
