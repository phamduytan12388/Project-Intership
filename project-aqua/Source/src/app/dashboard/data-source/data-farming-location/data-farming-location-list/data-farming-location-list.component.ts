import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FarmingLocation } from 'src/app/shared/models/data-source/farming-location/farming-location.model';
import { DataAreaFilter } from 'src/app/shared/models/data-source/data-area/data-area-filter.model';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { debounceTime } from 'rxjs/operators';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { DictionaryItem } from 'src/app/shared/models/dictionary/dictionary-item.model';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { NotificationPopupComponent } from 'src/app/shared/component/popups/notification-popup/notification-popup.component';
import { DataFarmingLocationPopupComponent } from 'src/app/shared/component/popups/data-farming-location-popup/data-farming-location-popup.component';
import { ConfirmPopupComponent } from 'src/app/shared/component/popups/confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-data-farming-location-list',
  templateUrl: './data-farming-location-list.component.html',
  styleUrls: ['./data-farming-location-list.component.scss']
})
export class DataFarmingLocationListComponent implements OnInit {
  searchTerm$ = new BehaviorSubject<string>('');
  farmingLocationList: FarmingLocation[];
  filterModel = new DataAreaFilter();
  locationTypeData: DictionaryItem[];
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  constructor(
    private dataSourceService: DataSourceService,
    private masterDataService: MasterDataService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
  ) { }


  ngOnInit(): void {
    this.masterDataService.getMasterData('LocationType').subscribe(res => {
      this.locationTypeData = res.find(item => item.groupName === 'LocationType').childs;
    });
    this.searchTerm$.pipe(debounceTime(600)).subscribe(_ => {
      this.filterModel.searchKey = this.searchTerm$.value.trim();
      this.pageIndex = 1;
      this.filter();
    });
  }

  filter(pageIndex?: number): void {
    const filter = { ...this.filterModel };
    this.dataSourceService.getListFarmingLocation(
      pageIndex ? pageIndex : 1,
      this.pageSize,
      filter
    ).subscribe(result => {
      this.farmingLocationList = result.items;
      this.total = result.total;
      this.pageIndex = result.currentPage + 1;
    });
  }

  changPageSize(event: number): void {
    this.pageSize = event;
    this.pageIndex = 1;
    this.filter();
  }

  changePageIndex(event: number): void {
    this.filter(event);
  }

  renderIndex(index: number): number {
    return index + this.pageSize * (this.pageIndex - 1) + 1;
  }

  showInfo(item: FarmingLocation): void {
    const modalInfo = this.modalService.create({
      nzContent: NotificationPopupComponent,
      nzComponentParams: {
        title: 'Mô tả',
        vnContent: `<div class="text-left">${item && item.description.replace(/(?:\r\n|\r|\n)/g, '<br />')}</div>`,
      }
    });
  }

  createOrUpdateLocation(data: FarmingLocation = new FarmingLocation()): void {
    const modalLocation = this.modalService.create({
      nzContent: DataFarmingLocationPopupComponent,
      nzComponentParams: {
        data
      }
    });
    modalLocation.afterClose.subscribe((result) => {
      if (result && result.isSuccess) {
        this.filter();
      }
    });
  }

  delete(data: FarmingLocation): void {
    const modal = this.modalService.create({
      nzContent: ConfirmPopupComponent,
      nzComponentParams: {
        title: 'Thông báo',
        vnContent: 'Bạn có chắc muốn xóa ao nuôi này không?',
      },
    });
    modal.afterClose.subscribe((result) => {
      if (result && result.data) {
        this.dataSourceService.deleteFarmingLocation(data.id).subscribe(res => {
          data.status = new DictionaryItem('Delete', 'Đã xóa', 'Đã xóa', 'Delete');
          this.notification.success('Thông báo', 'Xóa ao thành công!');
        });
      }
    });
  }

}
