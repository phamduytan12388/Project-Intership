import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
                workName: 'Cong viec 2',
                workDesc: 'Mo ta 2'
              },
              workItem: [
                // {
                //   work: {
                //     workName: 'Cong viec 3',
                //     workDesc: 'Mo ta 3'
                //   },
                //   workItem: []
                // }
              ]
            }
          ]
        },
        {
          work: {
            workName: 'Cong viec K',
            workDesc: 'Mo ta K'
          },
          workItem: []
        }
      ]
    },
    { userID: 2, userName: 'loc', userNo: '002', userEmail: 'loc@gmail.com' }];
  private countService = new BehaviorSubject(0);

  currentCount = this.countService.asObservable();

  constructor() { }

  changeCount(count: number) {
    this.countService.next(count);
  }
}
