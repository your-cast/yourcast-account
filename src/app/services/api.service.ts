import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = environment.apiUrl + '/api/';
  options: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const headers = new HttpHeaders();
    // const headers = new HttpHeaders().set('Content-Type', 'text/plain');

    this.options = {
      headers: headers
    };
  }

  get(method: string): Observable<any> {
    return this.doRequest(this.http.get(this.url + method));
  }

  getWithParams(method: string, params: HttpParams): Observable<any> {
    return this.doRequest(this.http.get(this.url + method, Object.assign(this.options, {params: params})));
  }

  post(method: string, data: any): Observable<any> {
    return this.doRequest(this.http.post(this.url + method, data, this.options));
  }

  patch(method: string, data: any): Observable<any> {
    return this.doRequest(this.http.patch(this.url + method, data, this.options));
  }

  put(method: string, data: any): Observable<any> {
    return this.doRequest(this.http.put(this.url + method, data, this.options));
  }

  delete(method: string): Observable<any> {
    return this.doRequest(this.http.delete(this.url + method));
  }

  doRequest(request: Observable<any>): Observable<any> {
    // this.store.dispatch(apiRequestSent());
    return request.pipe(
      catchError(err => throwError(this.handleError(err))),
      finalize(() => {
        // this.store.dispatch(apiRequestFinished());
      })
    );
  }

  handleError(error: any): Error {
    if (error.status === 401) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
    return error;
  }
}
