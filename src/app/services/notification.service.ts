import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends ApiService {
  getUserNotifications(): Observable<any> {
    return this.get('v1/permissions/list');
  }
}
