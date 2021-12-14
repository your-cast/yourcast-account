import {ApiService} from './api.service';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  apiUrl: string;

  constructor(
    private apiService: ApiService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  createShow(formData: any): Observable<any> {
    return this.apiService.post('v1/show/create', JSON.stringify(formData));
  }
}
