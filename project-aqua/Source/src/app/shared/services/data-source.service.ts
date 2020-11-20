import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { DataFactor } from '../models/data-source/data-factor/data-factor.model';
import { DataFactorFilterModel } from '../models/data-source/data-factor/data-factor-filter.model';
import { DataAreaFilter } from '../models/data-source/data-area/data-area-filter.model';
import { Observable, Subscriber } from 'rxjs';
import Utils from '../helpers/utils.helper';
import { DataShrimpFilter } from '../models/data-source/data-shrimp/data-shrimp-filter.model';
import { map } from 'rxjs/operators';
import { FarmingLocationFilter } from '../models/data-source/farming-location/farming-location-filter.model';
import { FarmingLocation } from '../models/data-source/farming-location/farming-location.model';
import { DataShrimp } from '../models/data-source/data-shrimp/data-shrimp.model';
import { Unit } from '../models/data-source/data-factor/unit.model';
import { DataArea } from '../models/data-source/data-area/data-area.model';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService extends BaseService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  public getListShrimpData(
    pageNumber: number,
    pageSize: number,
    params: DataShrimpFilter
  ): Observable<any> {
    const paramsFilter: DataShrimpFilter = { ...params };
    const filterUrl = `api/data/filter-shrimp-breed/${pageNumber - 1}/${pageSize}`;
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


  public getListFactorData(
    pageNumber: number,
    pageSize: number,
    params: DataFactorFilterModel
  ): Observable<any> {
    const paramsFilter: DataFactorFilterModel = { ...params };
    if (!paramsFilter.dataType) {
      delete paramsFilter.dataType;
    }
    if (!paramsFilter.factorGroup) {
      delete paramsFilter.factorGroup;
    }
    const filterUrl = `api/management-factor/filter/${pageNumber - 1}/${pageSize}`;
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

  public getListDataArea(
    pageNumber: number,
    pageSize: number,
    params: DataAreaFilter
  ): Observable<any> {
    const paramsFilter: DataAreaFilter = { ...params };
    const filterUrl = `api/data/filter-area/${pageNumber - 1}/${pageSize}`;
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

  public getListDataAreaAll(): Observable<DataArea[]> {
    const filterUrl = `api/data/area/get-all`;
    return this.get(filterUrl);
  }

  public deleteFactor(requestModel: any): Observable<any> {
    const url = `api/management-factor/${requestModel.id}/delete`;
    return this.delete(url, requestModel);
  }
  public createOrUpdateFactor(requestModel: DataFactor): Observable<DataFactor> {
    let url = ``;
    if (requestModel.id) {
      url = `api/management-factor/update`;
      return this.put(url, requestModel);
    } else {
      url = `api/management-factor/create`;
      return this.post(url, requestModel);
    }
  }
  public getFactorDetail(id: string): Observable<DataFactor> {
    const url = `api/management-factor/${id}`;
    return this.get<DataFactor>(url);
  }

  public getMeasureUnit(): Observable<Unit[]> {
    const url = `api/data/measure-unit`;
    return this.get<Unit[]>(url);
  }

  public getListFarmingLocation(
    pageNumber: number,
    pageSize: number,
    params: DataAreaFilter
  ): Observable<any> {
    const paramsFilter: DataAreaFilter = { ...params };
    if (!paramsFilter.locationType) {
      delete paramsFilter.locationType;
    }
    const filterUrl = `api/farming-location/filter/${pageNumber - 1}/${pageSize}`;
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

  public createOrUpdate(data: any): Observable<DataShrimp[]> {
    let url = ``;
    if (data.id) {
      url = `api/farming-location/update`;
      return this.put(url, data)
    }
    url = `api/farming-location/create`;
    return this.post(url, data);
  }

  public deleteFarmingLocation(id: string): Observable<DataShrimp[]> {
    const url = `api/farming-location/${id}/delete`;
    return this.delete(url, null);
  }

  public getAllShrimpBreed(): Observable<DataShrimp[]> {
    const url = `api/data/shrimp-breed/get-all`;
    return this.get<DataShrimp[]>(url);
  }

  public getAllFarmingLocation(): Observable<FarmingLocation[]> {
    const url = `api/farming-location/get-all`;
    return this.get<FarmingLocation[]>(url);
  }

  public getAllFactors(): Observable<DataFactor[]> {
    const url = `api/management-factor/get-all`;
    return this.get<DataFactor[]>(url);
  }
}
