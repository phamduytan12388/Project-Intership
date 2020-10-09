import { Component, OnDestroy, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  constructor(private data: DataService) { }
  myCount: number = 0;
  sub: Subscription;
  ngOnInit(): void {
    this.sub = this.data.currentCount.subscribe(myCount => {
      // Todo
      this.myCount = myCount;
    });
    // const sub2 = this.data.currentCount.subscribe(_ => {});
    // this.sub.add(sub2);
  }

  ngOnDestroy() {
    console.log('Destroy');
    this.sub.unsubscribe();
  }

  // countChange(event) {
  //   this.myCount = event;
  // }


}
