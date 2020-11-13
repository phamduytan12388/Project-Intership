import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { DataService } from './shared/serivice/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;

}
