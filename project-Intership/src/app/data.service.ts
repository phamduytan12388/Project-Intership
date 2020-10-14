import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.class';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public userList: User[] = [{userID:1,userName:'tan',userNo:'001',userEmail:'tan@gmail.com'},
                              {userID:2,userName:'loc',userNo:'002',userEmail:'loc@gmail.com'}];
  private countService = new BehaviorSubject(0);
  
  currentCount = this.countService.asObservable();

  constructor() { }

  changeCount(count: number){
    this.countService.next(count);
  }
}
