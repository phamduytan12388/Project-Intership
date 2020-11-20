import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { merge } from 'lodash';
import { BaseService } from './base.service';
import { CryptoUtil } from '../helpers/crypto.helper';
import { UserGroupFilter } from '../models/user-group/user-group-filter.model';
import Utils from '../helpers/utils.helper';
import { UserFilter } from '../models/user/user-filter.model';
import { UserGroup } from '../models/user-group/user-group.model';
import { User } from '../models/user/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  public lastTimeReadNotification: number;
  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  public getListUserGroup(
    pageNumber: number,
    pageSize: number,
    params: UserGroupFilter
  ): Observable<any> {
    const paramsFilter: UserGroupFilter = { ...params };
    const filterUrl = `api/group/filter/${pageNumber - 1}/${pageSize}`;
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

  public getListUser(
    pageNumber: number,
    pageSize: number,
    params: UserFilter
  ): Observable<any> {
    const paramsFilter: UserFilter = { ...params };
    if (!paramsFilter.groupId) {
      delete paramsFilter.groupId;
    }
    const filterUrl = `api/user/filter/${pageNumber - 1}/${pageSize}`;
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

  public getUserDetail(id: string): Observable<User> {
    const url = `api/user/get?userId=${id}`;
    return this.get<User>(url);
  }

  public getUserGroupDetail(id: string): Observable<UserGroup> {
    const url = `api/group/${id}`;
    return this.get<UserGroup>(url);
  }

  public getAllUserGroups(): Observable<UserGroup[]> {
    const url = `api/group/get-all`;
    return this.get<UserGroup[]>(url);
  }

  public getAllUsers(): Observable<User[]> {
    const url = `api/user/get-all`;
    return this.get<User[]>(url);
  }

  public deleteUserGroup(requestModel: any): Observable<any> {
    const url = `api/group/delete`;
    return this.delete(url, requestModel);
  }

  public deleteUser(requestModel: any): Observable<any> {
    const url = `api/user/delete`;
    return this.delete(url, requestModel);
  }

  public createOrUpdateUserGroup(requestModel: UserGroup): Observable<UserGroup> {
    let url = ``;
    if (requestModel.id) {
      url = `api/group/update`;
      return this.put(url, requestModel);
    } else {
      url = `api/group/create`;
      return this.post(url, requestModel);
    }
  }

  public createOrUpdateUser(requestModel: User): Observable<User> {
    let url = ``;
    if (requestModel.id) {
      url = `api/user/update`;
      return this.put(url, requestModel);
    } else {
      url = `api/user/create`;
      return this.post(url, requestModel);
    }
  }

  public changePassword(
    accountId: string,
    oldPassword: string,
    newPassword: string
  ): Observable<boolean> {
    const url = `api/account/change-password`;
    return this.post(url, {
      accountId: accountId,
      oldPassword: CryptoUtil.hashMessage(oldPassword),
      newPassword: CryptoUtil.hashMessage(newPassword)
    });
  }
  public resetPassword(requestModel: any): Observable<any> {
    const url = `api/account/reset-password`;
    return this.patch(url, requestModel);
  }

  public changeStatusUser(requestModel: any): Observable<any> {
    const url = 'api/user/change-status';
    return this.patch(url, requestModel);
  }

  public changeDeActive(requestModel: any): Observable<any> {
    const url = 'api/user/deactive';
    return this.patch(url, requestModel);
  }

  public changeUserGroup(requestModel: any): Observable<any> {
    const url = 'api/user/change-group';
    return this.patch(url, requestModel);
  }

  public readNotify(): Observable<any> {
    const url = `api/user/read-notification`;
    return this.patch(url, null);
  }


}
