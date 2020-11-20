import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { ShrimpPeriodFilter } from '../models/record-active/shrimp-period/shrimp-period-filter.model';
import Utils from '../helpers/utils.helper';
import { map } from 'rxjs/operators';
import { ShrimpPeriod } from '../models/record-active/shrimp-period/shrimp-period.model';
@Injectable({
  providedIn: 'root'
})
export class ShrimpPeriodService extends BaseService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  public getListShrimpPeriod(
    pageNumber: number,
    pageSize: number,
    params: ShrimpPeriodFilter
  ): Observable<any> {
    const paramsFilter: ShrimpPeriodFilter = { ...params };
    if (!paramsFilter.shrimpBreedId) {
      delete paramsFilter.shrimpBreedId;
    }
    if (!paramsFilter.farmingLocationId) {
      delete paramsFilter.farmingLocationId;
    }
    const filterUrl = `api/shrimp-crop/filter/${pageNumber - 1}/${pageSize}`;
    return this.get(
      filterUrl,
      Utils.createFilterParam({ ...paramsFilter })
    ).pipe(
      map((result: any) => {
        return {
          currentPage: result.pageIndex,
          pageSize: result.pageSize,
          pageCount: result.totalPages,
          total: result.totalCount,
          items: result.items
        };
      })
    );
  }

  public createOrUpdateShrimpCrop(requestModel: ShrimpPeriod): Observable<ShrimpPeriod> {
    let url = ``;
    if (requestModel.id) {
      url = `api/shrimp-crop/update`;
      return this.put(url, requestModel);
    } else {
      url = `api/shrimp-crop/create`;
      return this.post(url, requestModel);
    }
  }
  public getShrimpCropDetail(id: string): Observable<ShrimpPeriod> {
    const url = `api/shrimp-crop/${id}`;
    return this.get<ShrimpPeriod>(url);
  }

  public getShrimpCrop(id: string): Observable<ShrimpPeriod> {
    const url = `api/shrimp-crop/${id}`;
    return this.get<ShrimpPeriod>(url);
  }

  public getAllShrimpCrop(): Observable<ShrimpPeriod[]> {
    const url = `api/shrimp-crop/get-all`;
    return this.get<ShrimpPeriod[]>(url);
  }



  public saveManagementFactor(data: any): Observable<any> {
    const url = `api/shrimp-crop/management-factor/create-or-update`;
    return this.post(url, data);
  }

  public getShrimpCropAll(): Observable<ShrimpPeriod[]> {
    const url = `api/shrimp-crop/get-all`;
    return this.get(url);
  }


}
