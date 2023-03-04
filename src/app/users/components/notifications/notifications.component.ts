import {Component, OnInit} from '@angular/core';
import {TableComponent} from '../../../common/table/table.component';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent extends TableComponent implements OnInit {
  constructor(
    protected notificationService: NotificationService,
    private router: Router
  ) {
    super(notificationService);

    this.displayedColumns = [
      'select',
      'title',
      'description'
    ];
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.notificationService.getUserNotifications().subscribe(response => {
      this.dataSource = response.result;
    });
  }
}
