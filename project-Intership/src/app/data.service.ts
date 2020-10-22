import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserLogin } from './employee/model/user-login';
import { User, WorkItem } from './employee/model/user.class';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public userList: User[] =
    [{
      userID: 1,
      userName: 'tan',
      userNo: '001',
      userEmail: 'tan@gmail.com',
      works: [
        {
          work: {
            workName: 'Cong viec 1',
            workDesc: 'Mo ta 1'
          },
          workItem: [
            {
              work: {
                workName: 'Cong viec 1.2',
                workDesc: 'Mo ta 1.2'
              },
              workItem: [
                {
                  work: {
                    workName: 'Cong viec 1.3',
                    workDesc: 'Mo ta 1.3'
                  },
                  workItem: []
                }
              ]
            }
          ]
        },
        {
          work: {
            workName: 'Cong viec 2',
            workDesc: 'Mo ta 2'
          },
          workItem: [
            {
              work: {
                workName: 'Cong viec 2.2',
                workDesc: 'Mo ta 2.2'
              },
              workItem: []
            }
          ]
        },
      ]
    },
    { userID: 2, userName: 'loc', userNo: '002', userEmail: 'loc@gmail.com' }];

  public userLogin: UserLogin[] =
    [
      {
        username: 'admin',
        password: '1'
      },
      {
        username: 'tan123',
        password: 'tan123'
      }
    ]
  private countService = new BehaviorSubject(0);

  currentCount = this.countService.asObservable();

  constructor() { }

  changeCount(count: number) {
    this.countService.next(count);
  }

  login(username: string, password: string): Boolean {
    return this.userLogin.some(el => el.username === username && el.password === password)
  }

  public isCanActivate(): boolean{
    const userLogin = localStorage.getItem('userLogin');
    return (userLogin) ? true : false;
  }
}
