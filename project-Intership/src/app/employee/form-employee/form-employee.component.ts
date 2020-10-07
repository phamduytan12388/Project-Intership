import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

  count: number = 0;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  
  ClickIncrease(){
    this.count++;
    this.change.emit(this.count);
  }

  ClickDecrease(){
    this.count--;
    this.change.emit(this.count);
  }
}
