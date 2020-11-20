import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  @ViewChild('form', { static: true }) form;
  constructor(

  ) {}
  ngOnInit(): void {
  }
  save(): void {
    this.form.submit();
  }
}
