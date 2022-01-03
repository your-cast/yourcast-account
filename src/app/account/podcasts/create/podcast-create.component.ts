import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShowService} from '../../../services/show.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-podcast-create',
  templateUrl: './podcast-create.component.html',
  styleUrls: ['./podcast-create.component.scss']
})
export class PodcastCreateComponent implements OnInit {
  infoFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private showService: ShowService,
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
      season: ['', Validators.required],
      episode: ['', Validators.required],
      alias: ['', Validators.required],
      type: ['full', Validators.required],
      summary: ['', Validators.required],
      explicit: [false, Validators.required],
    });
  }

  validShowInfo(): boolean {
    return !this.infoFormGroup.valid;
  }

  submitForm() {
    const formData = {
      title: this.infoFormGroup.controls['title'].value,
      description: this.infoFormGroup.controls['description'].value,
    };

    this.showService.createShow(formData).subscribe(response => {
      this.router.navigate(['/account/shows/list']);

      this.notificationService.openNotification({
        message: 'New show created!',
        type: 'check'
      });
    });
  }

  uploadFile($event: Event): void {
    console.log($event);
  }
}
