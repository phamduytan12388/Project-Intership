
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressMasterData } from '../models/master-data/address-master-data';
import { shareReplay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DictionaryItem } from '../models/dictionary/dictionary-item.model';
import { BaseService } from './base.service';

const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root'
})
export class MasterDataService extends BaseService {
  public cacheAddressMasterData$: Observable<AddressMasterData[]>;
  public cacheEntityStatusMasterData$: Observable<DictionaryItem[]>;
  constructor(public http: HttpClient) {
    super(http);
  }

  get addressMaster(): Observable<AddressMasterData[]> {
    if (!this.cacheAddressMasterData$) {
      this.cacheAddressMasterData$ = this.getAddressMasterData().pipe(
        shareReplay(CACHE_SIZE)
      );
    }
    return this.cacheAddressMasterData$;
  }

  mappingAddressMasterData(result: any): AddressMasterData {
    return {
      key: result.id,
      code: result.code,
      value: result.name,
      parentId: result.parentId,
      childs:
        result.childs && (result.childs || []).length
          ? result.childs.map(item => {
              return this.mappingAddressMasterData(item);
            })
          : null
    };
  }

  getAddressMasterData(): Observable<AddressMasterData[]> {
    return this.get<AddressMasterData>('api/data/addressmasterdata').pipe(
      map((data: any[]) =>
        data.map((item: any) => {
          return this.mappingAddressMasterData(item);
        })
      )
    );
  }

  getMasterData(
    groupName: string
  ): Observable<{ groupName: string; childs: DictionaryItem[] }[]> {
    return this.get<AddressMasterData>(
      `api/data/masterdata?groupsName=${groupName}`
    );
  }

  getProvince(idCountry: number, dataAddressMasterData: AddressMasterData[]): AddressMasterData[] {
    const data = (dataAddressMasterData || []).find(
      item => item.key === idCountry
    );
    return data ? data.childs : null;
  }

  getDistrict(idProvince: number, dataCountry: AddressMasterData[]): AddressMasterData[] {
    const data = (dataCountry || []).find(item => item.key === idProvince);
    return data ? data.childs : null;
  }

  getCommune(idDistrict: number, dataDistrict: AddressMasterData[]): AddressMasterData[] {
    const data = (dataDistrict || []).find(item => item.key === idDistrict);
    return data ? data.childs : null;
  }

  public getAllFeatures(): Observable<any> {
    const url = `api/data/feature`;
    return this.get<any>(url);
  }
}
