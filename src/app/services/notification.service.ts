import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppNotification} from '../models/app-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  noty: Observable<any>;
  public notification = new BehaviorSubject<any>(null);
  public timeout: any;

  constructor() {
    this.noty = this.notification.asObservable();
  }

  openNotification(data: AppNotification, duration: number = 4000): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.notification.next(data);
    this.timeout = setTimeout(() => this.notification.next(null), duration);
  }
}
