import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HarvestForestFilter } from 'src/app/shared/model/harvest-forest-filter';
import { Masterdata } from 'src/app/shared/model/masterdata';
import { DataService } from 'src/app/shared/serivice/data.service';

@Component({
  selector: 'app-haverst-registration-list',
  templateUrl: './haverst-registration-list.component.html',
  styleUrls: ['./haverst-registration-list.component.scss']
})
export class HaverstRegistrationListComponent implements OnInit {

  search$: BehaviorSubject<string> = new BehaviorSubject(this.dataService.toolbarSearch.search);
  public fgHaverstRegistrationList: FormGroup;
  public createFromForest: boolean = this.dataService.toolbarSearch.createFromForest;
  public fromDate: Date = this.dataService.toolbarSearch.fromDate;
  public toDate: Date = this.dataService.toolbarSearch.toDate;
  public status = this.dataService.toolbarSearch.status;
  public declareHarvestStatusdList: Masterdata[] = [];
  public total = 200;
  public harvestForestFilter: HarvestForestFilter;
  public loading = true;
  public pageSize = 10;
  public pageIndex = 1;
  public size: NzSelectSizeType = 'large';
  public accountId = '';
  public search = '';
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, null, null, null, '');
    forkJoin(
      this.dataService.getDeclareHarvestStatusHawa(),
      this.dataService.getForest(),
    ).subscribe(([res1, res2]) => {
      res1.forEach(e => {
        if (e.groupName === 'DeclareHarvestStatus') {
          e.childs.forEach(p => this.declareHarvestStatusdList.push(p));
        }
        this.accountId = JSON.parse(localStorage.getItem('userLoginHawa')).coCode;
      });
    });

    this.search$.pipe(
      debounceTime(250),
      distinctUntilChanged(),
    ).subscribe(query => {
      if (query) {
        this.search = query.trim();
        this.actionFilter();
      }
      else {
        this.search = '';
        this.actionFilter();
      }
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const search = this.search;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    let formDateNumber = 0;
    let toDateNumber = 0;
    const currentSort = sort.find(item => item.value !== null);
    const createFromForest = this.createFromForest;
    if (this.fromDate) {
      formDateNumber = Math.round(this.fromDate.getTime() / 1000);
    }
    if (this.toDate) {
      toDateNumber = Math.round(this.toDate.getTime() / 1000);
    }
    const status = this.status;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, formDateNumber, toDateNumber, status, createFromForest, sortOrder, search);
  }

  actionFilter(): void {
    const filter = this.search;
    let formDateNumber;
    let toDateNumber;
    const pageSize = this.pageSize;
    const pageIndex = this.pageIndex;
    const createFromForest = this.createFromForest;
    if (this.fromDate) {
      formDateNumber = Math.round(this.fromDate.getTime() / 1000);
    }
    if (this.toDate) {
      toDateNumber = Math.round(this.toDate.getTime() / 1000);
    }
    const status = this.status;
    const sortOrder = '';
    this.loadDataFromServer(pageIndex, pageSize, formDateNumber, toDateNumber, status, createFromForest, sortOrder, filter);
  }

  deleteFilter(): void {
    this.createFromForest = undefined;
    this.fromDate = undefined;
    this.toDate = undefined;
    this.status = undefined;
    this.actionFilter();
  }

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    formDateNumber: number,
    toDateNumber: number,
    status: string,
    createFromForest: boolean,
    sortOrder: string | null,
    filter: string
  ): void {
    this.loading = true;
    this.dataService.getHarvestForestFilterList(pageIndex - 1, pageSize, formDateNumber, toDateNumber, status, createFromForest, filter)
      .subscribe(data => {
        this.loading = false;
        this.total = data.totalCount; // mock the total data here
        this.harvestForestFilter = data;
      });
  }

  viewForest(id: string): void {
    this.dataService.setToolbarSearch(this.fromDate, this.toDate, this.status, this.createFromForest, this.search);
    this.router.navigate(['/dashboard/profile-management/haverst-registration-view/', id]);
  }

}
