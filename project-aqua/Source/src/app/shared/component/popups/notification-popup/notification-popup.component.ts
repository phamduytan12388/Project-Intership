import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.scss']
})
export class NotificationPopupComponent implements OnInit {
  @Input() title: string;
  @Input() vnContent: string;
  constructor() { }

  ngOnInit(): void { }
}
