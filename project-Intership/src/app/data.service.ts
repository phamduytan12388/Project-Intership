import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private countService = new BehaviorSubject(0);
  currentCount = this.countService.asObservable();

  constructor() { }

  changeCount(count: number){
    this.countService.next(count);
  }
}
