import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataFactorFilterModel } from 'src/app/shared/models/data-source/data-factor/data-factor-filter.model';

@Component({
  selector: 'app-data-management-factors',
  templateUrl: './data-management-factors.component.html',
  styleUrls: ['./data-management-factors.component.scss'],
})
export class DataManagementFactorsComponent implements OnInit {
  static filterModel = new DataFactorFilterModel();
  constructor() {}

  ngOnInit(): void {}
}
