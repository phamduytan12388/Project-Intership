import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLogin } from 'src/app/shared/model/user-login';
import { User, WorkItem } from 'src/app/shared/model/user.class';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserDetailHawa } from 'src/app/shared/model/user-detail-hawa';
import { UserLoginHawa } from 'src/app/shared/model/user-login-hawa';
import { map, shareReplay } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Masterdata } from '../model/masterdata';
import { HarvestForest } from '../model/harvest-forest';
import { HarvestForestFilterParam } from '../model/harvest-forest-filter';
import { ToolbarSearch } from '../model/other';
import { Role } from '../model/role';
import { AddressMasterdata } from '../model/address-masterdata';

@Injectable({
  providedIn: 'root'
})
export class DataService extends BaseService {
  public userList: User[] = [];

  public userLogin: UserLogin[] = [];
  public headers;
  public toolbarSearch = new ToolbarSearch();
  public address$: Observable<any>;
  public allow = true;
  CACHE_SIZE = 1;
  private countService = new BehaviorSubject(0);
  public role$ = new BehaviorSubject<Role>(null);


  currentCount = this.countService.asObservable();
  constructor(public http: HttpClient) {
    super(http);
  }
  getHeader(token: string): void {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  changeCount(count: number): void {
    this.countService.next(count);
  }

  // getUserData(): void{
  //   this.http.get('http://localhost:3000/user').subscribe(data => this.userList = (data as Array<User>));
  // }
  getUserData(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/user');
  }
  getUserLoginData(): void {
    this.http.get('http://localhost:3000/userLogin').subscribe(data => this.userLogin = (data as Array<UserLogin>));
  }

  postUserHawa(userLogin: UserLogin): Observable<UserLoginHawa> {
    return this.post<UserLoginHawa>('api/login', userLogin).pipe(map(res => res.data));
  }

  CreateHarvestForest(harvestForest: HarvestForest): Observable<any> {
    return this.post<any>('api/declare-harvest/create', harvestForest, this.headers).pipe(map(res => res.data));
  }

  getUserLoginHawa(): Observable<any> {
    return this.get('api/user/getdetail', null, this.headers);
  }

  getMasterdataHawa(): Observable<any> {
    return this.get('api/data/masterdata?groupsName=EnterpriseForestOwnerType,HouseholdForestOwnerType', null, this.headers);
  }

  getHarvestForestFilterList(
    pageIndex: number,
    pageSize: number,
    fromDateNumber: number,
    toDateNumber: number,
    status: string,
    createFromForest: boolean,
    search: string): Observable<any> {

    const params = new HttpParams()
      .append('fromDate', `${fromDateNumber}`)
      .append('toDate', `${toDateNumber}`)
      .append('status', `${status}`)
      .append('createFromForest', `${createFromForest}`);

    const harvestForestFilterParam = new HarvestForestFilterParam();
    if (fromDateNumber) {
      harvestForestFilterParam.fromDateNumber = fromDateNumber;
    }
    if (toDateNumber) {
      harvestForestFilterParam.toDateNumber = toDateNumber;
    }
    if (status) {
      harvestForestFilterParam.status = status;
    }
    if (createFromForest) {
      harvestForestFilterParam.createFromForest = createFromForest;
    }

    if (fromDateNumber || toDateNumber || status || createFromForest || search) {
      return this.get(`api/declare-harvest/filter/${pageIndex}/${pageSize}?searchKey=${search}`, harvestForestFilterParam, this.headers);
    }
    else {
      return this.get(`api/declare-harvest/filter/${pageIndex}/${pageSize}?searchKey=`, null, this.headers);
    }
  }

  getDeclareHarvestByID(id: string): Observable<any> {
    return this.get(`api/declare-harvest/${id}?isGroupByPlot=false`, null, this.headers);
  }

  getDeclareHarvestStatusHawa(): Observable<any> {
    return this.get('api/data/masterdata?groupsName=DeclareHarvestStatus', null, this.headers);
  }

  getForest(): Observable<any> {
    return this.get('api/forest/4cba385e-e411-4d22-b4de-1478dbbb382c', null, this.headers);
  }

  getForestByID(id: string): Observable<any> {
    if (id) {
      return this.get(`api/forest/${id}`, null, this.headers);
    }

    // return this.get('api/forest/4cba385e-e411-4d22-b4de-1478dbbb382c', null, this.headers);
  }

  getHarvestMethodHawa(): Observable<any> {
    return this.get('api/data/masterdata?groupsName=HarvestForestType,TreeType,HarvestMethod', null, this.headers);
  }

  getAddressMasterDataHawa(): Observable<any> {
    if (!this.address$) {
      this.address$ = this.get('api/data/addressmasterdata', null, this.headers).pipe(
        shareReplay(this.CACHE_SIZE)
      );
    }
    return this.address$;
  }

  getDetailUserData(id: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/user/${id}`);
  }

  updateDetailUserData(id: string, user: User): Observable<User> {
    return this.http.put<User>(`http://localhost:3000/user/${id}`, user)
  }

  addDetailUserData(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/user/', user)
  }

  deleteDetailUserData(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/user/${id}`);
  }

  login(username: string, password: string): Boolean {
    return this.userLogin.some(el => el.username === username && el.password === password)
  }

  public isCanActivate(): boolean {
    const userLoginHawa = localStorage.getItem('userLoginHawa');
    return (userLoginHawa) ? true : false;
  }

  setToolbarSearch(fromDate: Date, toDate: Date, status: string, createFromForest: boolean, search: string): void {
    this.toolbarSearch.fromDate = fromDate;
    this.toolbarSearch.toDate = toDate;
    this.toolbarSearch.status = status;
    this.toolbarSearch.createFromForest = createFromForest;
    this.toolbarSearch.search = search;
  }

  getRole(): Observable<any> {
    return this.get('api/role/get', null, this.headers);
  }
}
