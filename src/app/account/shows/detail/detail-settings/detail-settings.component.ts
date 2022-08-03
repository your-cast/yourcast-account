import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Show} from '../../../../models/show';
import {ImageService} from '../../../../services/image.service';
import {ShowService} from '../../../../services/show.service';
import {Router} from '@angular/router';
import {AlertService} from '../../../../services/alert.service';

@Component({
  selector: 'app-detail-settings',
  templateUrl: './detail-settings.component.html',
  styleUrls: ['./detail-settings.component.scss']
})
export class DetailSettingsComponent implements OnInit {
  @Input()
  show: Show;

  settingsFormGroup: FormGroup;
  image: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private showService: ShowService,
    private alertService: AlertService,
    private imageService: ImageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm(): void {
    this.settingsFormGroup = this.formBuilder.group({
      title: this.show.title,
      description: this.show.description,
      status: this.show.status === 'enabled',
    });
  }

  uploadFile($event: Event): void {
    const element = $event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if (fileList) {
      let formData: FormData = new FormData();
      formData.append('file', fileList[0], fileList[0].name);
      formData.append('param', 'artwork');

      this.imageService.uploadImage(formData).subscribe(response => {
        this.image = response.path;
      });
    }
  }

  handleUpdate(): void {
    const formData = {
      title: this.settingsFormGroup.controls['title'].value,
      description: this.settingsFormGroup.controls['description'].value,
      status: this.settingsFormGroup.controls['status'].value,
      artwork: this.image,
    };

    this.showService.updateShow(formData, this.show.id).subscribe(response => {
      this.router.navigate(['/shows/details/' + response.show.id]);
      this.alertService.success('Show updated!');
    });
  }
}
