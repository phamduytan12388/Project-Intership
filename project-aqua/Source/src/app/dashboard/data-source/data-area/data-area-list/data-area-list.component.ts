import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataArea } from 'src/app/shared/models/data-source/data-area/data-area.model';
import { BehaviorSubject } from 'rxjs';
import { DataAreaFilter } from 'src/app/shared/models/data-source/data-area/data-area-filter.model';
import { debounceTime } from 'rxjs/operators';
import { DataSourceService } from 'src/app/shared/services/data-source.service';

@Component({
  selector: 'app-data-area-list',
  templateUrl: './data-area-list.component.html',
  styleUrls: ['./data-area-list.component.scss']
})
export class DataAreaListComponent implements OnInit {
  searchTerm$ = new BehaviorSubject<string>('');
  dataAreaList: DataArea[];
  filterModel = new DataAreaFilter();
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  constructor(
    private dataSourceService: DataSourceService
  ) { }


  ngOnInit(): void {
    this.searchTerm$.pipe(debounceTime(600)).subscribe(_ => {
      this.filterModel.searchKey = this.searchTerm$.value.trim();
      this.pageIndex = 1;
      this.filter();
    });
  }

  filter(pageIndex?: number): void {
    const filter = { ...this.filterModel };
    this.dataSourceService.getListDataArea(
      pageIndex ? pageIndex : 1,
      this.pageSize,
      filter
    ).subscribe(result => {
      this.dataAreaList = result.items;
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

}

