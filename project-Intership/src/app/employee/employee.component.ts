import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  template: `
    <div class="employee">
      Parent: {{ myCount }}
      <form-employee
        [count]="myCount"
        (change)="countChange($event)">
      </form-employee>
    </div>
  `,
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor() { }
  myCount: number = 0;
  ngOnInit(): void {
  }

  countChange(event) {
    this.myCount = event;
  }
}
