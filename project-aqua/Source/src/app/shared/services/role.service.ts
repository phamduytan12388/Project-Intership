import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService {
  public cacheRole: any;
  public roleGroup: any[];
  constructor(public http: HttpClient) {
    super(http);
  }
  get role(): any {
    return this.cacheRole;
  }
  public loadUserRoles(): Observable<any> {
    return new Observable(observer => {
      this.get('api/role/get').subscribe(
        data => {
          this.mappingFeature(data.roles);
          this.mappingRoleGroup(data.groups);
          observer.next();
          observer.complete();
        },
        error => {
          observer.error(error);
          observer.complete();
        }
      );
    });
  }

  private mappingFeature(list: any[]): void {
    this.cacheRole = {};
    for (const item of list) {
      this.cacheRole[item.code] = item.code;
    }
  }

  private mappingRoleGroup(groups: any): void {
    this.roleGroup = groups;
  }
}
