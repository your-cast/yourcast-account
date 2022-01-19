import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UsersService extends ApiService {
  getUsersList(): Observable<any> {
    return this.get('v1/users/list');
  }
}
