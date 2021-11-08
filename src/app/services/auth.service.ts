import {ApiService} from './api.service';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {
    this.apiUrl = environment.apiUrl;
  }

  login(credentials: any): any {
    return this.apiService.post('auth', JSON.stringify(credentials)).pipe(
      map(response => {
        if (response && response['token']) {
          localStorage.setItem('token', response['token']);
          return true;
        } else {
          return false;
        }
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
