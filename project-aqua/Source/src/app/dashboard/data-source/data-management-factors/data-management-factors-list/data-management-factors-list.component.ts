import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ConfirmPopupComponent } from 'src/app/shared/component/popups/confirm-popup/confirm-popup.component';
import { ManagementFactorModalComponent } from 'src/app/shared/component/popups/management-factor-modal/management-factor-modal.component';
import { NotificationPopupComponent } from 'src/app/shared/component/popups/notification-popup/notification-popup.component';
import { ETypeForm } from 'src/app/shared/enums/type-form';
import { DataFactorFilterModel } from 'src/app/shared/models/data-source/data-factor/data-factor-filter.model';
import { DataFactor} from 'src/app/shared/models/data-source/data-factor/data-factor.model';
import { DictionaryItem } from 'src/app/shared/models/dictionary/dictionary-item.model';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { DataManagementFactorsComponent } from '../data-management-factors.component';
	
@Component({	
  selector: 'app-data-management-factors-list',	
  templateUrl: './data-management-factors-list.component.html',	
  styleUrls: ['./data-management-factors-list.component.scss']	
})
export class DataManagementFactorsListComponent implements OnInit {	
  searchTerm$ = new BehaviorSubject<string>('');
  factorData: DataFactor[];
  filterModel = new DataFactorFilterModel();
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  eTypeForm = ETypeForm;
  factorGroupData: DictionaryItem[] = [];
  listDataType: DictionaryItem[] = [];
  constructor(
    private dataSourceService: DataSourceService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private masterDataService: MasterDataService
  ) { }

  ngOnInit(): void {
    this.masterDataService.getMasterData('FactorGroup,FactorDataType').subscribe(res => {
      this.factorGroupData = res.find(
        item => item.groupName === 'FactorGroup'
      ).childs;
      this.listDataType = res.find(
        item => item.groupName === 'FactorDataType'
      ).childs;
    });
    this.filterModel = DataManagementFactorsComponent.filterModel;
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
    this.dataSourceService.getListFactorData(
      pageIndex ? pageIndex : 1,
      this.pageSize,
      filter
    ).subscribe(result => {
      this.factorData = result.items;
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

  delete(item: DataFactor): void {

    if (item.hasData) {
      const modalNoti = this.modalService.create({
        nzContent: NotificationPopupComponent,
        nzComponentParams: {
          title: 'Thông báo',
          vnContent: `Không thể thực hiện xóa bởi vì yếu tố quản lý ${item && item.name} đang được sử dụng để ghi nhận giá trị cho đợt nuôi.`
        }
      });
      return;
    }
    const modal = this.modalService.create({
      nzContent: ConfirmPopupComponent,
      nzComponentParams: {
        title: 'Thông báo',
        vnContent: `Bạn có chắc muốn xóa yếu tố quản lý ${item && item.name} này?`
      }
    });
    modal.afterClose.subscribe(result => {
      if (result && result.data) {
        const model = {id: item.id};
        this.dataSourceService.deleteFactor(model).subscribe(res => {
          this.notification.success(
            'Thông báo', 'Xóa yếu tố quản lý thành công!'
          );
          this.filter();
        });
      }
    });
  }

  createOrEditFactor(idFactor: string, typeForm: ETypeForm): void {
    const modal = this.modalService.create({
      nzContent: ManagementFactorModalComponent,
      nzComponentParams: {
        id: idFactor,
        type: typeForm,
      }
    });
    modal.afterClose.subscribe(result => {
      if (result && result.isSuccess) {
        this.filter();
      }
    });
  }

  showInfo(item: DataFactor): void {
    const modalInfo = this.modalService.create({
      nzContent: NotificationPopupComponent,
      nzComponentParams: {
        title: 'Mô tả',
        vnContent: `<div class="text-left">${item && item.description.replace(/(?:\r\n|\r|\n)/g, '<br />')}</div>`,
      }
    });
  }

}
