import { FileUploadController, FileService } from 'src/app/shared/services/file.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { WorkNotebookService } from 'src/app/shared/services/work-notebook.service';
import { WorkNoteBook } from 'src/app/shared/models/work-notebook/work-notebook.model';
import { WorkNotebookFilter } from 'src/app/shared/models/work-notebook/work-notebook-filter.model';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { FarmingLocation } from 'src/app/shared/models/data-source/farming-location/farming-location.model';
import { NzModalService, NzNotificationService, NzDatePickerComponent } from 'ng-zorro-antd';
import { UpdateHistoryPopupComponent } from 'src/app/shared/component/popups/update-history-popup/update-history-popup.component';
import Utils from 'src/app/shared/helpers/utils.helper';
import { NotificationPopupComponent } from 'src/app/shared/component/popups/notification-popup/notification-popup.component';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { DictionaryItem } from 'src/app/shared/models/dictionary/dictionary-item.model';
import { environment } from 'src/environments/environment';
import { FileData } from 'src/app/shared/models/master-data/file-data.model';
import { ShrimpPeriodService } from 'src/app/shared/services/shrimp-period.service';
import { ShrimpPeriod } from 'src/app/shared/models/record-active/shrimp-period/shrimp-period.model';
import { DataFactor } from 'src/app/shared/models/data-source/data-factor/data-factor.model';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-work-notebook-list',
  templateUrl: './work-notebook-list.component.html',
  styleUrls: ['./work-notebook-list.component.scss']
})
export class WorkNotebookListComponent implements OnInit {
  workNoteBookData: WorkNoteBook[];
  filterModel = new WorkNotebookFilter();
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  farmingLocationData: FarmingLocation[] = [];
  imageShowPopupView: string[];
  indexOfImage: number;
  showPopupViewImage = false;
  workNoteBookItemEdit = new WorkNoteBook();
  isNewValue = false;
  statusData: DictionaryItem[];
  carouselItem: WorkNoteBook;
  isLoadingTable: boolean;
  shrimpPeriodDataAll: ShrimpPeriod[];
  factorGroupData: DictionaryItem[];
  userAll: User[];
  constructor(
    private workNotebookService: WorkNotebookService,
    private dataSourceService: DataSourceService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private fileService: FileService,
    private masterDataService: MasterDataService,
    private shrimpPeriodService: ShrimpPeriodService,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notiService: NotificationService,
    private authenticationService: AuthenticationService
  ) { }

  get shrimpPeriodDataShow(): ShrimpPeriod[] {
    if (!this.filterModel.farmingLocationId) {
      this.filterModel.shrimpCropId = null;
      return [];
    }
    return (this.shrimpPeriodDataAll || []).filter(
      (item) => item.farmingLocation.id === this.filterModel.farmingLocationId.toString()
    );
  }

  ngOnInit(): void {
    this.filterModel.fromDate = new Date(new Date().setHours(0, 0, 0, 0));
    this.filterModel.toDate = new Date(new Date().setHours(23, 59, 59, 999));
    const userModel = this.authenticationService.getAuthenticationModel();
    this.filterModel.curator = userModel && userModel.userId;
    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.notify) {
        this.filterModel = new WorkNotebookFilter();
      }
      if (queryParams.fromDate) {
        this.filterModel.fromDate = new Date(+queryParams.fromDate);
      }
      if (queryParams.toDate) {
        this.filterModel.toDate = new Date(+queryParams.toDate);
      }
      if (queryParams.curator) {
        this.filterModel.curator = queryParams.curator;
      }
      if (queryParams.locationId) {
        this.filterModel.farmingLocationId = queryParams.locationId;
      }
      if (queryParams.shrimpCropId) {
        this.filterModel.shrimpCropId = queryParams.shrimpCropId;
      }
      this.filter();
    });
    forkJoin(
      this.dataSourceService.getAllFarmingLocation(),
      this.masterDataService.getMasterData('WorkStatus,FactorGroup'),
      this.shrimpPeriodService.getShrimpCropAll(),
      this.userService.getAllUsers()
    ).subscribe(([res1, res2, res3, res4]) => {
      this.farmingLocationData = res1;
      this.statusData = res2.find(item => item.groupName === 'WorkStatus').childs;
      this.shrimpPeriodDataAll = res3;
      this.factorGroupData = res2.find(
        item => item.groupName === 'FactorGroup'
      ).childs;
      this.userAll = res4;
    });
  }

  filter(pageIndex?: number): void {
    this.isLoadingTable = true;
    const filter = { ...this.filterModel };
    this.workNotebookService.getListWorkNotebook(
      pageIndex ? pageIndex : 1,
      this.pageSize,
      filter
    ).subscribe(result => {
      this.workNoteBookData = result.items;
      this.total = result.total;
      this.pageIndex = result.currentPage + 1;
      this.isLoadingTable = false;
    }, err => {
      this.isLoadingTable = false;
    });
  }

  clearFilter(): void {
    this.filterModel = new WorkNotebookFilter();
    this.filter();
  }

  viewFullScreenImage(item: WorkNoteBook, indexOfImage?): void {
    this.carouselItem = item;
    this.imageShowPopupView = [...item.pictures.map(itemPicture => `${environment.API_ENDPOINT}api/file/${itemPicture.id}`)];
    this.indexOfImage = indexOfImage;
  }

  uploadImage(event, item: WorkNoteBook): void {
    let err = '';
    const files: File[] = event.target.files;
    if ((item.pictures || []).length + files.length > 3) {
      this.notification.error('Thông báo', 'Công việc chỉ có thể có tối đa 3 hình minh chứng');
      return;
    }
    if (Utils.checkTypeFileImage(files) && item.pictures && item.pictures.length < 3) {
      for (let i = 0; i < files.length && i < 3; i++) {
        if (files[i].size > 10 * 1024 * 1024) {
          err = `File (${files[i].name}) vượt quá dung lượng 10Mb`;
        }
      }
    }
    if (err) {
      this.notification.error('Thông báo (Notification)', err);
    } else {
      const observableFiles = [];
      let picturesPush = [];
      for (let i = 0; i < files.length && i < 3; i++) {
        observableFiles.push(this.resizeAndUploadImage(files[i]));
      }
      forkJoin(observableFiles).pipe(
        switchMap(res => {
          picturesPush = res.map(element => {
            return {
              id: element['data'] && element['data'].id,
              orgFileName: element['data'] && element['data'].orgFileName,
              orgFileExtension: item['data'] && element['data'].orgFileExtension,
              fileUrl: element['data'] && element['data'].fileUrl,
              container: null,
            };
          });
          const requestModel = {
            workId: item.id,
            pictures: picturesPush,
          };
          return this.workNotebookService.uploadImage(requestModel);
        }
        )).subscribe(_ => {
          item.pictures = [...(item.pictures || [])].concat(picturesPush);
          this.cdr.detectChanges();
          this.notification.success('Thông báo', 'Thêm hình ảnh minh chứng thành công');
        });
    }
    event.target.value = null;
  }

  viewHistory(item: WorkNoteBook): void {
    const modalHistory = this.modalService.create({
      nzContent: UpdateHistoryPopupComponent,
      nzComponentParams: {
        id: item.id
      }
    });
  }

  showInfo(item: WorkNoteBook): void {
    const modalInfo = this.modalService.create({
      nzContent: NotificationPopupComponent,
      nzComponentParams: {
        title: 'Mô tả',
        vnContent: `<div class="text-left">${item.description.replace(/(?:\r\n|\r|\n)/g, '<br />')}</div>`,
      }
    });
  }

  resizeAndUploadImage(file: File): Observable<any> {
    return new Observable(observer => {
      const filename = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        Utils.resizeFile(reader.result, filename).subscribe(resizedFile => {
          this.fileService.uploadFile(resizedFile).subscribe(
            data => {
              observer.next(data);
              observer.complete();
            },
            error => {
              observer.error(error);
              observer.complete();
            }
          );
        });
      };
      reader.readAsDataURL(file);
    });
  }

  closeView(): void {
    this.imageShowPopupView = null;
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

  chooseItemEdit(item: WorkNoteBook): void {
    this.workNoteBookItemEdit = { ...item };
  }

  createOrEditNoteBook(item: WorkNoteBook): void {
    this.workNoteBookItemEdit.value = this.workNoteBookItemEdit.value.replace(/[^0-9]*/g, '');
    if (item.value === this.workNoteBookItemEdit.value) {
      this.workNoteBookItemEdit = new WorkNoteBook();
      return;
    }
    this.workNoteBookItemEdit['isSubmit'] = true;
    if (!this.workNoteBookItemEdit.value) {
      return;
    }
    const requestModel = {
      workId: item.id,
      value: this.workNoteBookItemEdit.value,
      modifiedAt: item.modifiedAt
    };
    this.workNotebookService.updateOrCreateValue(requestModel).subscribe(res => {
      item.value = this.workNoteBookItemEdit.value;
      item.modifiedAt = res.data.modifiedAt;
      this.workNoteBookItemEdit = new WorkNoteBook();
      this.notification.success('Thông báo', 'Ghi nhận giá trị thành công');
    });
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue) {
      return false;
    }
    const toDate = this.filterModel.toDate;
    return (
      // new Date().setHours(0, 0, 0, 0) > startValue.getTime() ||
      (toDate &&
        startValue.setHours(0, 0, 0, 0) >
        toDate.setHours(23, 59, 59, 999))
    );
  }
  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue) {
      return false;
    }
    const fromDate = this.filterModel.fromDate;
    return (
      (fromDate &&
        endValue.setHours(23, 59, 59, 999) <
        fromDate.setHours(0, 0, 0, 0))
      // || new Date().setHours(0, 0, 0, 0) > endValue.getTime()
    );
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
      fromDate.onChangeFn(fromDate.nzValue && fromDate.nzValue.nativeDate ? new Date(fromDate.nzValue.nativeDate.setHours(23, 59, 59, 999)) : null);
    }
  }

  isWarning(item: WorkNoteBook): boolean {
    return item && !item.value && this.isSameDate(new Date(item.executionTime * 1000), new Date()) &&
      (item.executionTime * 1000 > new Date().getTime());
  }

  isSameDate(first: Date, second: Date): boolean {
    return first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate();
  }

  isLateDeadline(item: WorkNoteBook): boolean {
    return item && !item.value && (item.executionTime * 1000 < new Date().getTime());
  }

  changeFarmingLocation(event): void {
    this.filterModel.shrimpCropId = null;
  }
}
