import {Component, Input, OnInit} from '@angular/core';
import {AppNotification} from '../../models/app-notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() data?: AppNotification;

  constructor() {
  }

  ngOnInit(): void {
  }

}
