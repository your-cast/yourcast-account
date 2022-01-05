import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../services/notification.service';
import {EpisodesService} from '../../../services/episodes.service';
import {AudioFileService} from '../../../services/audiofile.service';
import {Track} from 'ngx-audio-player';

@Component({
  selector: 'app-podcast-create',
  templateUrl: './podcast-create.component.html',
  styleUrls: ['./podcast-create.component.scss']
})
export class PodcastCreateComponent implements OnInit {
  infoFormGroup: FormGroup;
  audioFile: any = null;
  audioFileList: Track[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private episodesService: EpisodesService,
    private audioFileService: AudioFileService,
    private router: Router,
    public notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.prepareForm();
  }

  prepareForm(): void {
    this.infoFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      link: ['', Validators.required],
      season: ['1', Validators.required],
      episode: ['1', Validators.required],
      alias: ['', Validators.required],
      type: ['full', Validators.required],
      summary: ['', Validators.required],
      explicit: [false, Validators.required]
    });
  }

  validShowInfo(): boolean {
    return this.infoFormGroup.valid;
  }

  submitForm() {
    if (!this.validShowInfo()) {
      return;
    }

    const formData = {
      show_id: 1,
      audio_id: this.audioFile.id,
      title: this.infoFormGroup.controls['title'].value,
      subtitle: this.infoFormGroup.controls['subtitle'].value,
      link: this.infoFormGroup.controls['link'].value,
      season: this.infoFormGroup.controls['season'].value,
      episode: this.infoFormGroup.controls['episode'].value,
      alias: this.infoFormGroup.controls['alias'].value,
      type: this.infoFormGroup.controls['type'].value,
      summary: this.infoFormGroup.controls['summary'].value,
      explicit: this.infoFormGroup.controls['explicit'].value
    };

    this.episodesService.createEpisode(formData).subscribe(response => {
      this.router.navigate(['/account/shows/list']);

      this.notificationService.openNotification({
        message: 'New episode added to your show!',
        type: 'check'
      });
    });
  }

  uploadFile($event: Event): void {
    const element = $event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let formData: FormData = new FormData();
      formData.append('audio', fileList[0], fileList[0].name);

      this.audioFileService.uploadAudioFile(formData).subscribe(response => {
        this.audioFileList.push({
          title: 'Audio file',
          link: response.path,
          artist: 'You'
        });

        this.audioFile = {
          path: response.path,
          id: response.file_id
        };
      });
    }
  }

  deleteAudioFile() {
    this.audioFileList = [];
    this.audioFile = null;
  }
}
