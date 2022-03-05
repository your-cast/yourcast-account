import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UsersService extends ApiService {
  getUsersList(): Observable<any> {
    return this.get('v1/user/list');
  }

  getUserDetail(id: any): Observable<any> {
    return this.get('v1/user/' + id);
  }
}
