import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShowService} from '../../../services/show.service';
import languages from '../../../../assets/other/languages.json';
import timezones from '../../../../assets/other/timezones.json';

interface Params {
  value: string;
  name: string;
}

@Component({
  selector: 'app-show-create',
  templateUrl: './show-create.component.html',
  styleUrls: ['./show-create.component.scss']
})
export class ShowCreateComponent implements OnInit {
  showSpinner: boolean;
  isLinear = false;
  timezones: Params[] = [];
  languages: Params[] = [];
  infoFormGroup: FormGroup;
  artworkFormGroup: FormGroup;
  formatFormGroup: FormGroup;
  otherFormGroup: FormGroup;
  categoryFormGroup: FormGroup;
  ownerFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private showService: ShowService
  ) {
    this.showSpinner = false;
  }

  ngOnInit() {
    this.prepareForm();
    this.prepareTimezones();
    this.prepareLanguages();
  }

  prepareForm(): void {
    this.infoFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.max(150)]
    });
    this.artworkFormGroup = this.formBuilder.group({
      artwork: ['']
    });
    this.formatFormGroup = this.formBuilder.group({
      format: ['episodic', Validators.required]
    });
    this.otherFormGroup = this.formBuilder.group({
      timezone: ['Europe/Kiev', Validators.required],
      language: ['uk', Validators.required],
      explicit: [false]
    });
    this.categoryFormGroup = this.formBuilder.group({
      firstCategory: ['', Validators.required],
      firstSubCategory: ['', Validators.required],
      secondCategory: [''],
      secondSubCategory: [''],
      thirdCategory: [''],
      thirdSubCategory: ['']
    });
    this.ownerFormGroup = this.formBuilder.group({
      author: ['', Validators.required],
      owner: ['', Validators.required],
      ownerEmail: ['', Validators.required],
      copyright: ['']
    });
  }

  prepareTimezones(): void {
    this.timezones = timezones;
  }

  prepareLanguages(): void {
    this.languages = languages;
  }

  submitForm() {
    this.showService.createShow({}).subscribe();
  }
}
