import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
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
