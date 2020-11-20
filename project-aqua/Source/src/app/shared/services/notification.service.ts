import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import DateTimeConvertHelper from '../helpers/datetime-convert-helper';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseService {
  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  public getListNotification(
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    const filterUrl = `api/notify/filter/${pageNumber - 1}/${pageSize}`;
    return this.get(
      filterUrl,
    ).pipe(
      map((result: any) => {
        return {
          extraData: result.extraData,
          currentPage: result.pageIndex,
          pageSize: result.pageSize,
          pageCount: result.totalPages,
          total: result.totalCount,
          items: result.items
        };
      })
    );
  }

  public markAllNotification(): Observable<any> {
    const url = `api/notify/mark-all-as-read`;
    const data = {
      timestamp: DateTimeConvertHelper.fromDtObjectToTimestamp(new Date())
    }
    return this.patch(url, data);
  }

  public markNotification(id: string): Observable<any> {
    const url = `api/notify/${id}/mark-as-read/`;
    return this.patch(url, null);
  }
}
