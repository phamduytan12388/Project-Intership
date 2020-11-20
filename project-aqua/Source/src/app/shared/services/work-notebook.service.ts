import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkNotebookFilter } from '../models/work-notebook/work-notebook-filter.model';
import { map } from 'rxjs/operators';
import { WorkNoteBookHistory } from '../models/work-notebook/work-notebook.history.model';
import Utils from '../helpers/utils.helper';

@Injectable({
  providedIn: 'root'
})
export class WorkNotebookService extends BaseService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  public getListWorkNotebook(
    pageNumber: number,
    pageSize: number,
    params: WorkNotebookFilter
  ): Observable<any> {
    const paramsFilter: WorkNotebookFilter = { ...params };
    const filterUrl = `api/work/filter/${pageNumber - 1}/${pageSize}`;
    if (paramsFilter.fromDate) {
      paramsFilter.fromDate = new Date(paramsFilter.fromDate.setHours(0, 0, 0, 0));
    }
    if (paramsFilter.toDate) {
      paramsFilter.toDate = new Date(paramsFilter.toDate.setHours(23, 59, 59, 999));
    }
    if (!paramsFilter.farmingLocationId) {
      delete paramsFilter.farmingLocationId;
    }
    if (!paramsFilter.shrimpCropId) {
      delete paramsFilter.shrimpCropId;
    }
    if (!paramsFilter.status) {
      delete paramsFilter.status;
    }
    if (!paramsFilter.factorGroup) {
      delete paramsFilter.factorGroup;
    }
    if (!paramsFilter.curator) {
      delete paramsFilter.curator;
    }
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

  public updateOrCreateValue(data: any): Observable<any> {
    const url = `api/work/record`;
    return this.put(url, data);
  }

  public uploadImage(data: any): Observable<any> {
    const url = `api/work/update-picture`;
    return this.put(url, data);
  }

  public getItemHistories(id: string): Observable<WorkNoteBookHistory[]> {
    const url = `api/work/${id}/histories`;
    return this.get(url);
  }

  public removePicture(data: any): Observable<any> {
    const url = `api/work/remove-picture`;
    return this.delete(url, data);
  }

  public removeWork(shrimCropManagementFactorId: string, isCancel: boolean, modifiedAt: number): Observable<any> {
    let url = ``;
    if (isCancel) {
      url = `api/shrimp-crop/management-factor/cancel`;
      const requestModel = {
        shrimpCropManagementFactoId: shrimCropManagementFactorId,
        modifiedAt: modifiedAt ? modifiedAt : 0
      };
      return this.post(url, requestModel);
    } else {
      url = `api/work/${shrimCropManagementFactorId}/stop`;
      return this.delete(url, null);
    }
  }
}
