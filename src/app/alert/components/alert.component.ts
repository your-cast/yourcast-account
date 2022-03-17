import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {Subscription} from 'rxjs';
import {Alert} from '../models/alert';
import {AlertService} from '../services/alert.service';
import {AlertType} from '../models/alert-type';

@Component({
  selector: 'alert',
  styleUrls: ['./alert.component.scss'],
  templateUrl: 'alert.component.html'
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  AlertType = AlertType;

  alerts: Alert[] = [];
  // @ts-ignore
  alertSubscription: Subscription;
  // @ts-ignore
  routeSubscription: Subscription;

  constructor(
    private router: Router,
    private alertService: AlertService
  ) {

  }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        if (!alert.message) {
          return;
        }

        this.alerts.push(alert);

        setTimeout(() => this.removeAlert(alert), 5000);
      });

    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert): void {
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      // @ts-ignore
      this.alerts.find(x => x === alert).fade = true;
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert): any {
    if (!alert) {
      return;
    }

    const classes = ['notification', 'notification-show'];

    const alertTypeClass = {
      [AlertType.Success]: 'notification-alert-success',
      [AlertType.Error]: 'notification-alert-danger',
      [AlertType.Info]: 'notification-alert-info',
      [AlertType.Warning]: 'notification-alert-warning'
    }

    classes.push(alertTypeClass[alert.type]);

    return classes.join(' ');
  }

  cssIconClass(alert: Alert): any {
    if (!alert) {
      return;
    }

    const classes = ['notification-icon-container'];

    const alertTypeClass = {
      [AlertType.Success]: 'notification-icon-container-success',
      [AlertType.Error]: 'notification-icon-container-danger',
      [AlertType.Info]: 'notification-icon-container-info',
      [AlertType.Warning]: 'notification-icon-container-warning'
    }

    classes.push(alertTypeClass[alert.type]);

    return classes.join(' ');
  }
}
