import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @ViewChild('form', { static: true }) form;
  param: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.param = this.route.snapshot.params['id'].includes('?') ?
    this.route.snapshot.params['id'].split('?')[0] : this.route.snapshot.params['id'];
  }
  save(): void {
    this.form.submit();
  }
}
