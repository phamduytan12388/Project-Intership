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

  counter: number = 0;
  @Output() voteSize = new EventEmitter();
  
  ClickIncrease(){
    this.counter++;
    this.voteSize.emit(this.counter);
  }

  ClickDecrease(){
    this.counter--;
    this.voteSize.emit(this.counter);
  }
}
