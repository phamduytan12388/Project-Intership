import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Utils from '../helpers/utils.helper';
import { CropReportFilter } from '../models/statistic-report/crop-report-filter.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  public getReportData(
    params: CropReportFilter
  ): Observable<any> {
    const paramsFilter: CropReportFilter = { ...params };
    if (!paramsFilter.shrimpCropId) {
      delete paramsFilter.shrimpCropId;
    }
    if (!paramsFilter.farmingLocationId) {
      delete paramsFilter.farmingLocationId;
    }
    if (!paramsFilter.fromDate) {
      delete paramsFilter.fromDate;
    }
    if (!paramsFilter.toDate) {
      delete paramsFilter.toDate;
    }
    if (paramsFilter.fromDate) {
      paramsFilter.fromDate = new Date(paramsFilter.fromDate.setHours(0, 0, 0, 0));
    }
    if (paramsFilter.toDate) {
      paramsFilter.toDate = new Date(paramsFilter.toDate.setHours(23, 59, 59, 999));
    }
    const filterUrl = `api/work/get-all`;
    return this.get(
      filterUrl,
      Utils.createFilterParam({ ...paramsFilter })
    );
  }


}
