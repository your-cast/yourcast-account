import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioFileService extends ApiService {
  uploadAudioFile(file: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('audio', file, file.name);

    return this.post('v1/upload-audio', formData);
  }
}
