import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataShrimpFilter } from 'src/app/shared/models/data-source/data-shrimp/data-shrimp-filter.model';

@Component({
  selector: 'app-data-shrimp',
  templateUrl: './data-shrimp.component.html',
  styleUrls: ['./data-shrimp.component.scss'],
})
export class DataShrimpComponent implements OnInit {
  static filterModel = new DataShrimpFilter();
  constructor() {}

  ngOnInit(): void {}
}
