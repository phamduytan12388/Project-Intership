import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { ShrimpPeriod } from 'src/app/shared/models/record-active/shrimp-period/shrimp-period.model';
import { ShrimpPeriodFilter } from 'src/app/shared/models/record-active/shrimp-period/shrimp-period-filter.model';
import { ShrimpPeriodService } from 'src/app/shared/services/shrimp-period.service';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { DataAreaFilter } from 'src/app/shared/models/data-source/data-area/data-area-filter.model';
import { DataShrimpFilter } from 'src/app/shared/models/data-source/data-shrimp/data-shrimp-filter.model';
import { FarmingLocation } from 'src/app/shared/models/data-source/farming-location/farming-location.model';
import { DataShrimp } from 'src/app/shared/models/data-source/data-shrimp/data-shrimp.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-period-list',
  templateUrl: './period-list.component.html',
  styleUrls: ['./period-list.component.scss']
})
export class PeriodListComponent implements OnInit {
  searchTerm$ = new BehaviorSubject<string>('');
  shrimpPeriodData: ShrimpPeriod[];
  filterModel = new ShrimpPeriodFilter();
  farmingLocationData: FarmingLocation[];
  shrimpData: DataShrimp[];
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  constructor(
    private shrimpPeriodService: ShrimpPeriodService,
    private dataSourceService: DataSourceService
  ) { }

  ngOnInit(): void {
    forkJoin(
      this.dataSourceService.getAllFarmingLocation(),
      this.dataSourceService.getAllShrimpBreed()
    ).subscribe(([res1, res2]) => {
      this.farmingLocationData = res1;
      this.shrimpData = res2;
    });
    this.searchTerm$.pipe(debounceTime(600)).subscribe((_) => {
      this.filterModel.searchKey = this.searchTerm$.value;
      this.pageIndex = 1;
      this.filter();
    });
  }

  filter(pageIndex?: number): void {
    const filter = { ...this.filterModel };
    this.shrimpPeriodService.getListShrimpPeriod(
      pageIndex ? pageIndex : 1,
      this.pageSize,
      filter
    ).subscribe(result => {
      this.shrimpPeriodData = result.items;
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
