import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  checkAuthenticated(): boolean {
    return !!localStorage.getItem('Authenticated');
  }

  auth(credentials: any): Observable<any> {
    localStorage.setItem('Authenticated', 'true');
    return this.http.post('/api/v1/auth', credentials);
  }

  logout(redirect: string): void {
    localStorage.removeItem('Authenticated');
    this.router.navigate(['login']);
  }
}
