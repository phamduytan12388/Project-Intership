import { forkJoin } from 'rxjs';
import * as _ from 'lodash';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NzDatePickerComponent, NzModalService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { FarmingLocation } from 'src/app/shared/models/data-source/farming-location/farming-location.model';
import { ShrimpPeriod } from 'src/app/shared/models/record-active/shrimp-period/shrimp-period.model';
import { ReportService } from 'src/app/shared/services/report.service';
import { ReportItem } from 'src/app/shared/models/statistic-report/report.model';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { ShrimpPeriodService } from 'src/app/shared/services/shrimp-period.service';
import DateTimeConvertHelper from 'src/app/shared/helpers/datetime-convert-helper';
import { BoldPipe } from 'src/app/shared/pipes/bold.pipe';
import { CropReportFilter } from 'src/app/shared/models/statistic-report/crop-report-filter.model';
import { NotificationPopupComponent } from 'src/app/shared/component/popups/notification-popup/notification-popup.component';
import vi from 'date-fns/locale/vi/index';
@Component({
  selector: 'app-shrimp-period-report',
  templateUrl: './shrimp-period-report.component.html',
  styleUrls: ['./shrimp-period-report.component.scss'],
  providers: [DatePipe, BoldPipe],
})
export class ShrimpPeriodReportComponent implements OnInit {
  dateFormat = 'dd/MM/yyyy';
  isNewValue = false;

  filterModel = new CropReportFilter();
  farmingLocationData: FarmingLocation[] = [];
  shrimpCropData: ShrimpPeriod[] = [];
  shrimpCropFilterData: ShrimpPeriod[] = [];
  titleReport = '';

  chartOption = {
    title: ``,
    axes: {
      bottom: {
        title: 'Ngày',
        mapsTo: 'key',
        scaleType: 'time',
      },
      left: {
        mapsTo: 'value',
        title: 'Giá trị',
        scaleType: 'linear',
      },
    },
    height: '600px',
    resizable: true,
    animations: true,
    tooltip: {
      groupLabel: 'YTQL',
      enabled: true,
      showTotal: true,
      valueFormatter: (value) => {
        if (typeof value === 'string' && new Date(value).getTime()) {
          return (
            `${new Date(value).getDate()} ` +
            'tháng ' +
            `${new Date(value).getMonth() + 1}`
          );
        }
        return value;
      },
    },
    legend: {
      position: 'right',
      enabled: true,
      clickable: true,
    },
    timeScale: {
      localeObject: vi,
    },
  };
  fromDateShrimpCrop: number;
  toDateShrimpCrop: number;
  chartData = [];

  constructor(
    private reportService: ReportService,
    private dataSourceService: DataSourceService,
    private shrimpPeriodService: ShrimpPeriodService,
    private datePipe: DatePipe,
    private boldPipe: BoldPipe,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
    forkJoin(
      this.dataSourceService.getAllFarmingLocation(),
      this.shrimpPeriodService.getAllShrimpCrop()
    ).subscribe(([res1, res2]) => {
      this.farmingLocationData = res1;
      this.shrimpCropData = res2;
    });
  }

  filter(isShow?: boolean): void {
    const filter = { ...this.filterModel };
    if (
      filter.farmingLocationId &&
      filter.shrimpCropId &&
      filter.fromDate &&
      filter.toDate
    ) {
      this.chartOption.title = `Báo cáo thống kê các yếu tố quản lý `;
      this.reportService.getReportData(filter).subscribe((result) => {
        this.mappingReportData(result);
      });
      return;
    }
    if (!isShow) {
      const modalNoti = this.modalService.create({
        nzContent: NotificationPopupComponent,
        nzComponentParams: {
          title: 'Thông báo',
          vnContent: 'Vui lòng chọn tất cả các tiêu chí để xem biểu đồ',
        },
      });
    }
  }

  clearFilter(): void {
    this.filterModel.fromDate = null;
    this.filterModel.toDate = null;
    this.filterModel.shrimpCropId = null;
    this.filterModel.farmingLocationId = null;
    this.filter(true);
  }

  mappingReportData(data: any): any {
    const reportData = [];
    (data || []).forEach((item) => {
      const itemModel = new ReportItem();
      itemModel.key = new Date(
        DateTimeConvertHelper.fromTimestampToDtObject(item.executionTime)
      );
      itemModel.group = item.managementFactor.name;
      itemModel.value = item.value;
      reportData.push(itemModel);
    });
    this.chartData = [...reportData.sort((a, b) => a.key - b.key)];
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.filterModel.toDate) {
      return false;
    }
    return (
      (startValue.setHours(0, 0, 0, 0) >
        this.filterModel.toDate.setHours(23, 59, 59, 999))
      ||
      (startValue.setHours(23, 59, 59, 999) <
        new Date(this.fromDateShrimpCrop).setHours(0, 0, 0, 0)
      )
    );
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.filterModel.fromDate) {
      return false;
    }
    return (
      (endValue.setHours(23, 59, 59, 999) <
        this.filterModel.fromDate.setHours(0, 0, 0, 0)) ||
      (endValue.setHours(0, 0, 0, 0) >
        new Date(this.toDateShrimpCrop).setHours(23, 59, 59, 999))
    );
  };

  fromDateChange(toDate: any): void {
    if (!this.isNewValue) {
      this.isNewValue = true;
      setTimeout(() => {
        this.isNewValue = false;
      });
      toDate.onChangeFn(
        toDate.nzValue && toDate.nzValue.nativeDate
          ? new Date(toDate.nzValue.nativeDate.setHours(0, 0, 0, 0))
          : null
      );
      // new Date(this.toDateShrimpCrop)
    }
  }

  toDateChange(fromDate: any): void {
    if (!this.isNewValue) {
      this.isNewValue = true;
      setTimeout(() => {
        this.isNewValue = false;
      });
      fromDate.onChangeFn(
        fromDate.nzValue && fromDate.nzValue.nativeDate
          ? new Date(fromDate.nzValue.nativeDate.setHours(0, 0, 0, 0))
          : null
      );
      // new Date(this.fromDateShrimpCrop)
    }
  }

  changeFarmingLocation(event): void {
    this.filterModel.shrimpCropId = null;
    this.filterModel.fromDate = null;
    this.filterModel.toDate = null;
    if (!event) {
      this.shrimpCropFilterData = null;
      return;
    }
    this.shrimpCropFilterData = (this.shrimpCropData || []).filter(
      (item) => item.farmingLocation.id === event.toString()
    );
  }

  changeShrimpCrop(event): void {
    if (!event) {
      this.filterModel.fromDate = null;
      this.filterModel.toDate = null;
      return;
    }
    this.fromDateShrimpCrop =
      (this.shrimpCropData || []).find((item) => item.id === event.toString())
        .fromDate * 1000;
    this.filterModel.fromDate = new Date(this.fromDateShrimpCrop);
    this.toDateShrimpCrop =
      (this.shrimpCropData || []).find((item) => item.id === event.toString())
        .toDate * 1000;
    this.filterModel.toDate = new Date(this.toDateShrimpCrop);
  }

  get getTitleReport(): string {
    if (this.filterModel.shrimpCropId) {
      return (this.shrimpCropData || []).find(
        (item) => item.id === this.filterModel.shrimpCropId
      ).name;
    }
    return '';
  }
}
