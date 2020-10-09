import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import {User} from './../../user.class';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent implements OnInit {

  public user: User = new User();
  constructor(private data: DataService) { 
    this.data.currentCount.subscribe(counter => this.counter = counter);
  }

  ngOnInit(): void {
  }

  counter: number = 0;
  @Output() voteSize = new EventEmitter();
  //======Output=====
  // ClickIncrease(){
  //   this.counter++;
  //   this.voteSize.emit(this.counter);
  // }

  // ClickDecrease(){
  //   this.counter--;
  //   this.voteSize.emit(this.counter);
  // }

  //======DataService
  ClickIncrease(){
    this.counter++;
    this.data.changeCount(this.counter);
  }

  ClickDecrease(){
    this.counter--;
    this.data.changeCount(this.counter);
  }

  onSubmitForm(formUser: NgForm){
    console.log(formUser.value);
  }

  onResertForm(formUser: NgForm){
    formUser.reset();
  }
}
