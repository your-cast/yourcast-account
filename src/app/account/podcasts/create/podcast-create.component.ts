import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../services/notification.service';
import {EpisodesService} from '../../../services/episodes.service';
import {AudioFileService} from '../../../services/audiofile.service';
import {Track} from 'ngx-audio-player';
import {ImageService} from '../../../services/image.service';
import {ShowService} from '../../../services/show.service';
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-podcast-create',
  templateUrl: './podcast-create.component.html',
  styleUrls: ['./podcast-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PodcastCreateComponent implements OnInit {
  infoFormGroup: FormGroup;
  image: string = '';
  selectedShowId: any = null;
  audioFile: any = null;
  audioFileList: Track[] = [];
  shows: any = [];

  public Editor = ClassicEditor;

  constructor(
    private formBuilder: FormBuilder,
    private episodesService: EpisodesService,
    private showService: ShowService,
    private audioFileService: AudioFileService,
    private imageService: ImageService,
    private router: Router,
    public notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.getShows();
    this.prepareForm();
    this.subscribeEditForm();
  }

  getShows(): void {
    this.showService.showShortList().subscribe(response => {
      this.shows = response.result;
    });
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

  subscribeEditForm(): void {
    this.infoFormGroup.controls['title'].valueChanges.subscribe((value: any) => {
      console.log('here');
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
      show_id: this.selectedShowId,
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
      this.router.navigate(['/shows/list']);

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

  uploadImage($event: Event): void {
    const element = $event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let formData: FormData = new FormData();
      formData.append('file', fileList[0], fileList[0].name);
      formData.append('param', 'cover');

      this.imageService.uploadImage(formData).subscribe(response => {
        this.image = response.path;
      });
    }
  }

  deleteAudioFile() {
    this.audioFileList = [];
    this.audioFile = null;
  }

  handleSelectShow(id: number) {
    if (this.selectedShowId === id) {
      this.selectedShowId = 0;
    }
    this.selectedShowId = id;
  }

  onChange({editor}: ChangeEvent) {
    this.infoFormGroup.controls['summary'].setValue(editor.getData());
  }
}
