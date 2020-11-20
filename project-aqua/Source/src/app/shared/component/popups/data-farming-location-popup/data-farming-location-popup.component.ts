import { Component, OnInit, Input } from '@angular/core';
import { FarmingLocation } from 'src/app/shared/models/data-source/farming-location/farming-location.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { DictionaryItem } from 'src/app/shared/models/dictionary/dictionary-item.model';
import { forkJoin } from 'rxjs';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { DataArea } from 'src/app/shared/models/data-source/data-area/data-area.model';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-data-farming-location-popup',
  templateUrl: './data-farming-location-popup.component.html',
  styleUrls: ['./data-farming-location-popup.component.scss']
})
export class DataFarmingLocationPopupComponent implements OnInit {
  @Input() data: FarmingLocation;
  isSubmitted: boolean;
  locationForm: FormGroup;
  locationTypeData: DictionaryItem[];
  areaData: DataArea[];
  constructor(
    private fb: FormBuilder,
    private masterDataService: MasterDataService,
    private dataSourceService: DataSourceService,
    private modal: NzModalRef,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    forkJoin(
      this.masterDataService.getMasterData('LocationType'),
      this.dataSourceService.getListDataAreaAll()
    ).subscribe(([res1, res2]) => {
      this.locationTypeData = res1.find(item => item.groupName === 'LocationType').childs;
      this.areaData = res2;
    });
    this.createForm();
  }

  createForm(): void {
    this.locationForm = this.fb.group({
      id: this.data.id,
      code: this.data.code,
      name: [this.data.name, CustomValidator.required],
      locationType: [this.data.type, CustomValidator.required],
      area: [this.data.area, CustomValidator.required],
      landArea: this.data.landArea,
      description: this.data.description,
      attachment: this.data.attachment,
      modifiedAt: this.data.modifiedAt
    });
    this.locationForm.valueChanges.subscribe(_ => {
      this.onFormValueChanged(this.locationForm);
    });
  }

  onFormValueChanged(formGroup): void {
    if (this.isSubmitted) {
      ValidationHelper.isValidateForm(formGroup);
    }
  }

  validateForm(formGroup: FormGroup): boolean {
    return ValidationHelper.isValidateForm(formGroup);
  }

  compareDataNZSelect(itemOne, itemTwo): boolean {
    return itemOne && itemTwo
      ? itemOne.code === itemTwo.code
      : itemOne === itemTwo;
  }

  compareDataNZSelectArea(itemOne, itemTwo): boolean {
    return itemOne && itemTwo
      ? itemOne.id.toString() === itemTwo.id.toString()
      : itemOne === itemTwo;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (!this.validateForm(this.locationForm)) {
      const valueForm = this.locationForm.getRawValue();
      const requestModel = {
        id: valueForm.id,
        modifiedAt: valueForm.modifiedAt ? valueForm.modifiedAt : 0,
        name: valueForm.name,
        locationType: valueForm.locationType,
        area: valueForm.area,
        landArea: +valueForm.landArea,
        description: valueForm.description,
        attachment: valueForm.attachment,
      };
      this.dataSourceService.createOrUpdate(requestModel).subscribe(res => {
        this.notification.success('Thông báo', valueForm.id ? 'Cập nhật ao nuôi thành công' : 'Tạo mới ao nuôi thành công');
        this.modal.destroy({ isSuccess: true });
      });
    }
  }

  closePopup(): void {
    this.modal.destroy({});
  }

}
