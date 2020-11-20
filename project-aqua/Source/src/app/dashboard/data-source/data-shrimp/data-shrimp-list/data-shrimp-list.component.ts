import { DataShrimpComponent } from './../data-shrimp.component';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataShrimpFilter } from 'src/app/shared/models/data-source/data-shrimp/data-shrimp-filter.model';
import { DataShrimp } from 'src/app/shared/models/data-source/data-shrimp/data-shrimp.model';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { ShrimpPeriod } from 'src/app/shared/models/record-active/shrimp-period/shrimp-period.model';
import { NotificationPopupComponent } from 'src/app/shared/component/popups/notification-popup/notification-popup.component';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-data-shrimp-list',
  templateUrl: './data-shrimp-list.component.html',
  styleUrls: ['./data-shrimp-list.component.scss']
})
export class DataShrimpListComponent implements OnInit {

  searchTerm$ = new BehaviorSubject<string>('');
  shrimpData: DataShrimp[];
  filterModel = new DataShrimpFilter();
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  constructor(
    private dataSourceService: DataSourceService,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
    this.filterModel = DataShrimpComponent.filterModel;
    if (this.filterModel.searchKey) {
      this.searchTerm$.next(this.filterModel.searchKey);
    }
    this.searchTerm$.pipe(debounceTime(600)).subscribe(_ => {
      this.filterModel.searchKey = this.searchTerm$.value.trim();
      this.pageIndex = 1;
      this.filter();
    });
  }

  filter(pageIndex?: number): void {
    const filter = { ...this.filterModel };
    this.dataSourceService.getListShrimpData(
      pageIndex ? pageIndex : 1,
      this.pageSize,
      filter
    ).subscribe(result => {
      this.shrimpData = result.items;
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

  showInfo(item: DataShrimp): void {
    const modalInfo = this.modalService.create({
      nzContent: NotificationPopupComponent,
      nzComponentParams: {
        title: 'Mô tả',
        vnContent: `<div class="text-left">${item && item.description.replace(/(?:\r\n|\r|\n)/g, '<br />')}</div>`,
      }
    });
  }
}
