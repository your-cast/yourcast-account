import {ApiService} from './api.service';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.apiUrl = environment.apiUrl;
  }

  profile(): Observable<any> {
    return this.apiService.get('v1/profile');
  }

  login(credentials: any): any {
    return this.apiService.post('v1/login', JSON.stringify(credentials)).pipe(
      map(response => {
        if (response && response['access_token']) {
          localStorage.setItem('token', response['access_token']);
          localStorage.setItem('userId', response['user'].id);
          return true;
        } else {
          return false;
        }
      }));
  }

  register(credentials: any): any {
    return this.apiService.post('v1/register', JSON.stringify(credentials)).pipe(
      map(response => {
        console.log(response);
        return true;
      }));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!(token && token.length);
  }
}
