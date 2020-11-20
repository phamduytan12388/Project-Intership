import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CandyDate, NzDatePickerComponent } from 'ng-zorro-antd';
import { DataFactor } from 'src/app/shared/models/data-source/data-factor/data-factor.model';
import { DictionaryItem } from 'src/app/shared/models/dictionary/dictionary-item.model';
import { User } from 'src/app/shared/models/user/user.model';

@Component({
  selector: 'app-factor-form-group',
  templateUrl: './factor-form-group.component.html',
  styleUrls: ['./factor-form-group.component.scss']
})
export class FactorFormGroupComponent implements OnInit {
  @ViewChild('factorFromDate') factorFromDate: NzDatePickerComponent;
  @ViewChild('factorToDate') factorToDate: NzDatePickerComponent;
  @Input() factorGroup: FormGroup;
  @Input() factorData: DataFactor[] = [];
  @Input() userData: User[] = [];
  @Input() frequencyData: DictionaryItem[] = [];
  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Input() i: number;
  @Output() deleteFactorGroup = new EventEmitter();
  @Output() changeFrequency = new EventEmitter();
  @Output() saveManagementFactor = new EventEmitter();
  @Output() stopManagementFactor = new EventEmitter();
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
  dateFormat = 'dd/MM/yyyy';
  isNewValue = false;
  constructor() { }

  ngOnInit(): void {
    if (this.factorGroup.value.id) {
      this.factorGroup.disable();
    }
    this.factorGroup.get('id').valueChanges.subscribe(data => {
      if (data) {
        this.factorGroup.disable();
      }
    });
  }

  compareDataNZSelectData(itemOne, itemTwo): boolean {
    return itemOne && itemTwo
      ? itemOne.id.toString() === itemTwo.id.toString()
      : itemOne === itemTwo;
  }

  compareDataNZSelectUser(itemOne, itemTwo): boolean {
    return itemOne && itemTwo
      ? itemOne.id.toString() === itemTwo.id.toString()
      : itemOne === itemTwo;
  }

  compareDataNZSelect(itemOne, itemTwo): boolean {
    return itemOne && itemTwo
      ? itemOne.code.toString() === itemTwo.code.toString()
      : itemOne === itemTwo;
  }

  disabledFromDate = (value: Date, factorGroup: FormGroup): boolean => {
    if (!value) {
      return false;
    }
    return (
      this.fromDate.setHours(0, 0, 0, 0) > value.getTime()
      || this.toDate.setHours(23, 59, 59, 999) < value.getTime() ||
      (this.factorToDate && this.factorToDate.nzValue && value.getTime() > (this.factorToDate.nzValue as CandyDate).getTime())
    );
  }

  disabledToDate = (value: Date): boolean => {
    if (!value) {
      return false;
    }
    return (
      this.fromDate.setHours(0, 0, 0, 0) > value.getTime()
      || this.toDate.setHours(23, 59, 59, 999) < value.getTime() ||
      (this.factorFromDate.nzValue && value.getTime() < (this.factorFromDate.nzValue as CandyDate).getTime())
    );
  }

  deleteFactorGroupClick(i): void {
    this.deleteFactorGroup.emit(i);
  }

  changeFrequencyClick(data): void {
    this.changeFrequency.emit(this.factorGroup);
  }

  saveManagementFactorClick(formItemFactor: FormGroup, isCreateWork: boolean): void {
    this.saveManagementFactor.emit({ formItemFactor, isCreateWork });
  }

  stopManagementFactorClick(formItemFactor: FormGroup, isStop): void {
    this.stopManagementFactor.emit(formItemFactor);
  }

  fromDateChange(toDate: any): void {
    if (!this.isNewValue) {
      this.isNewValue = true;
      setTimeout(() => {
        this.isNewValue = false;
      });
      // tslint:disable-next-line:max-line-length
      toDate && toDate.onChangeFn(toDate.nzValue && toDate.nzValue.nativeDate ? new Date(toDate.nzValue.nativeDate.setHours(0, 0, 0, 0)) : null);
    }
  }

  toDateChange(fromDate: any): void {
    if (!this.isNewValue) {
      this.isNewValue = true;
      setTimeout(() => {
        this.isNewValue = false;
      });
      // tslint:disable-next-line:max-line-length
      fromDate && fromDate.onChangeFn(fromDate.nzValue && fromDate.nzValue.nativeDate ? new Date(fromDate.nzValue.nativeDate.setHours(0, 0, 0, 0)) : null);
    }
  }


}
