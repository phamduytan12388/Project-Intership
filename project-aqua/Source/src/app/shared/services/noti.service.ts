import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import DateTimeConvertHelper from '../helpers/datetime-convert-helper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotiService extends BaseService {

  constructor(public http: HttpClient) {
    super(http);
  }

  public getListNotification(
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    // const filterUrl = `api/notification/filter/${pageNumber - 1}/${pageSize}`;
    // return this.get(filterUrl).pipe(
    //   map((result: any) => {
    //     return {
    //       extraData: {
    //         countNew: result.extraData.countNew,
    //         countUnread: result.extraData.countUnread
    //       },
    //       currentPage: result.pageIndex,
    //       pageSize: result.pageSize,
    //       pageCount: result.totalPages,
    //       total: result.totalCount,
    //       items: [
    //         {
    //           id: '1',
    //           url: 'url',
    //           title: 'title',
    //           message: 'message',
    //           sentTime: 12321321,
    //           type: 'type',
    //           status: 'status',
    //         },
    //         {
    //           id: '2',
    //           url: 'url',
    //           title: 'title',
    //           message: 'message',
    //           sentTime: 12321321,
    //           type: 'type',
    //           status: 'status',
    //         },
    //         {
    //           id: '3',
    //           url: 'url',
    //           title: 'title',
    //           message: 'message',
    //           sentTime: 12321321,
    //           type: 'type',
    //           status: 'status',
    //         }
    //       ]
    //     };
    //   })
    // );
    return new Observable(res => {
      res.next({
        currentPage: 1,
        pageSize: 10,
        pageCount: 10,
        total: 10,
        items: [
          {
            id: '1',
            url: 'url',
            title: 'Nhắc nhở: Thực hiện ghi nhận PH',
            message: 'Thực hiện ghi nhận ph tại Gièo 1 vào lúc 7:00 28/10/2020',
            sentTime: 12321321,
            type: 'type',
            status: 'status',
          },
          {
            id: '2',
            url: 'url',
            title: 'Nhắc nhở: Thực hiện ghi nhận TSS',
            message: 'Thực hiện ghi nhận tại Gièo 1 vào lúc 8:00 28/10/2020',
            sentTime: 12321321,
            type: 'type',
            status: 'status',
          }
        ]
      });
    })
  }

  public markAllNotification(): Observable<any> {
    // Todo
    const url = `api/notification/mark-all-as-read`;
    const data = {
      timestamp: DateTimeConvertHelper.fromDtObjectToTimestamp(new Date())
    }
    return this.patch(url, data);
  }

  public deleteAllNotification(): Observable<any> {
    // Todo
    const url = `...`;
    return this.post(url);
  }

  public markNotification(id: string): Observable<any> {
    // Todo
    const url = `api/notification/mark-as-read/${id}`;
    return this.patch(url, null);
  }

  public deleteNotification(): Observable<any> {
    // Todo
    const url = `...`;
    return this.post(url);
  }

  public readNotification(): Observable<any> {
    const url = `api/user/read-notification`;
    return this.patch(url, null);
  }
}
