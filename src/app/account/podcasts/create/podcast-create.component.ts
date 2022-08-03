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
import {AlertService} from '../../../services/alert.service';

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
    public alertService: AlertService
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
    const english = /^[A-Za-z\s]*$/;
    this.infoFormGroup.controls['title'].valueChanges.subscribe((value: any) => {
      if (english.test(value)) {
        this.infoFormGroup.patchValue({
          alias: this.replaceSymbols(value),
        });
      } else {
        this.infoFormGroup.patchValue({
          alias: this.replaceCyrillicSymbols(value),
        });
      }
    });
  }

  replaceSymbols(value: string): string {
    const replace = /[^A-Z\d]/ig;
    return value.replace(replace, '-');
  }

  replaceCyrillicSymbols(value: string): string {
    const cyrillic = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
      'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
      'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
      'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
      'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
      'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
    };

    const translate = [];

    value = value.replace(/[ъь]+/g, '').replace(/й/g, 'i');

    for (let i = 0; i < value.length; ++i) {
      translate.push(
        // @ts-ignore
        cyrillic[value[i]]
        // @ts-ignore
        || cyrillic[value[i].toLowerCase()] == undefined && value[i]
        // @ts-ignore
        || cyrillic[value[i].toLowerCase()].replace(/^(.)/, function (match) {
          return match.toUpperCase()
        })
      );
    }

    return this.replaceSymbols(translate.join(''));
  }

  validShowInfo(): boolean {
    return this.infoFormGroup.valid;
  }

  submitForm() {
    if (!this.validShowInfo()) {
      console.log(this.validShowInfo())
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

      this.alertService.success('New episode added to your show!');
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
