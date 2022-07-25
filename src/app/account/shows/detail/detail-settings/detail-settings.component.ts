import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Show} from '../../../../models/show';

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

  constructor(private formBuilder: FormBuilder) {
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

  }

  handleUpdate(): void {

  }
}
