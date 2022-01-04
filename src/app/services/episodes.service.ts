import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService extends ApiService {
  createEpisode(formData: any): Observable<any> {
    return this.post('v1/episodes/create', JSON.stringify(formData));
  }

  listEpisodes(): Observable<any> {
    return this.get('v1/episodes/list/');
  }

  getEpisodeInfo(id: any): Observable<any> {
    return this.get('v1/episodes/' + id);
  }
}
