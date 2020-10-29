import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLogin } from './employee/model/user-login';
import { User, WorkItem } from './employee/model/user.class';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDetailHawa } from './employee/model/user-detail-hawa';
import { UserLoginHawa } from './employee/model/user-login-hawa';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DataService extends BaseService {
  public userList: User[] = []
    
  public userLogin: UserLogin[] = []
  
  private countService = new BehaviorSubject(0);

  currentCount = this.countService.asObservable();
  constructor(public http: HttpClient) { 
    super(http);
  }

  changeCount(count: number) {
    this.countService.next(count);
  }

  // getUserData(): void{
  //   this.http.get('http://localhost:3000/user').subscribe(data => this.userList = (data as Array<User>));
  // }
  getUserData(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/user');
  }
  getUserLoginData(): void{
    this.http.get('http://localhost:3000/userLogin').subscribe(data => this.userLogin = (data as Array<UserLogin>));
  }

  postUserHawa(userLogin: UserLogin): Observable<UserLoginHawa>{
    return this.post<UserLoginHawa>('api/login', userLogin).pipe(map(res => res.data));
    return this.http.post<UserLoginHawa>('http://hawadevapi.bys.vn/api/login', userLogin);
  }

  // getUserLoginHawa(token: string): Observable<UserDetailHawa> {
  //   const headers = new Headers();
  //   let tokenParse = JSON.parse(token);        
  //   headers.append('Authorization', `Bearer ${tokenParse}`);
  //   const opts = new RequestOptions({ headers: headers });  
  //   console.log(JSON.stringify(opts));
  //   return this.http.get<UserDetailHawa>('http://hawadevapi.bys.vn/api/user/getdetail', opts);
  // }

  getUserLoginHawa(auth_token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.get('api/user/getdetail', null, headers);
    return this.http.get<any>('http://hawadevapi.bys.vn/api/user/getdetail', { headers: headers });
  }

  getDetailUserData(id: string): Observable<User>{
    return this.http.get<User>(`http://localhost:3000/user/${id}`);
  }

  updateDetailUserData(id: string, user: User): Observable<User>{
    return this.http.put<User>(`http://localhost:3000/user/${id}`, user)
  }

  addDetailUserData(user: User): Observable<User>{
    return this.http.post<User>('http://localhost:3000/user/', user)
  }

  deleteDetailUserData(id: string): Observable<any>{
   return this.http.delete<any>(`http://localhost:3000/user/${id}`);
  }

  login(username: string, password: string): Boolean {
    return this.userLogin.some(el => el.username === username && el.password === password)
  }

  public isCanActivate(): boolean {
    const userLoginHawa = localStorage.getItem('userLoginHawa');
    return (userLoginHawa) ? true : false;
  }
}
