import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-period-create',
  templateUrl: './period-create.component.html',
  styleUrls: ['./period-create.component.scss']
})
export class PeriodCreateComponent implements OnInit {

  @ViewChild('form', { static: true }) form;
  constructor(

  ) {}
  ngOnInit(): void {
  }
  save(): void {
    this.form.submit();
  }
}
