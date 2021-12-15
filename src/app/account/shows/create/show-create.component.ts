import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShowService} from '../../../services/show.service';
import languages from '../../../../assets/other/languages.json';
import timezones from '../../../../assets/other/timezones.json';
import categories from '../../../../assets/other/categories.json';
import {Param} from '../../../models/param';

@Component({
  selector: 'app-show-create',
  templateUrl: './show-create.component.html',
  styleUrls: ['./show-create.component.scss']
})
export class ShowCreateComponent implements OnInit {
  isLinear = true;
  timezones: Param[] = [];
  languages: Param[] = [];
  categories: any = [];
  firstSubcategory: Param[] = [];
  secondSubcategory: Param[] = [];
  thirdSubcategory: Param[] = [];
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
  }

  ngOnInit() {
    this.prepareForm();
    this.subscribeValueChange();
    this.prepareTimezones();
    this.prepareLanguages();
    this.prepareCategories();
  }

  prepareForm(): void {
    this.infoFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.max(150)]]
    });
    this.artworkFormGroup = this.formBuilder.group({
      artwork: ['']
    });
    this.formatFormGroup = this.formBuilder.group({
      format: ['episodic', Validators.required]
    });
    this.otherFormGroup = this.formBuilder.group({
      timezone: ['Etc/GMT', Validators.required],
      language: ['en', Validators.required],
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

  subscribeValueChange(): void {
    this.categoryFormGroup.controls['firstCategory'].valueChanges.subscribe((value: any) => {
      this.applySubCategory(value, 'first');
    });
    this.categoryFormGroup.controls['secondCategory'].valueChanges.subscribe((value: any) => {
      this.applySubCategory(value, 'second');
    });
    this.categoryFormGroup.controls['thirdCategory'].valueChanges.subscribe((value: any) => {
      this.applySubCategory(value, 'third');
    });
  }

  prepareTimezones(): void {
    this.timezones = timezones;
  }

  prepareLanguages(): void {
    this.languages = languages;
  }

  prepareCategories(): void {
    this.categories = categories;
  }

  applySubCategory(selected: string, value: string) {
    const subcategory: Param[] = [];

    this.categories.forEach((category: Param) => {
      if (category.value === selected) {
        if (category.hasOwnProperty('children')) {
          category.children?.forEach((children: Param) => {
            subcategory.push({
              value: children.value,
              name: children.name
            });
          });
        }
      }
    });

    if (value === 'first') {
      this.firstSubcategory = subcategory;
    }
    if (value === 'second') {
      this.secondSubcategory = subcategory;
    }
    if (value === 'third') {
      this.thirdSubcategory = subcategory;
    }
  }

  validShowInfo(): boolean {
    return !this.infoFormGroup.valid;
  }

  validCategory(): boolean {
    return !this.categoryFormGroup.valid;
  }

  submitForm() {
    const formData = {
      title: this.infoFormGroup.controls['title'].value,
      description: this.infoFormGroup.controls['description'].value,
      artwork: this.artworkFormGroup.controls['artwork'].value,
      format: this.formatFormGroup.controls['format'].value,
      timezone: this.otherFormGroup.controls['timezone'].value,
      language: this.otherFormGroup.controls['language'].value,
      explicit: this.otherFormGroup.controls['explicit'].value,
      category: this.categoryFormGroup.controls['firstCategory'].value,
      tags: null,
      author: this.ownerFormGroup.controls['author'].value,
      podcast_owner: this.ownerFormGroup.controls['owner'].value,
      email_owner: this.ownerFormGroup.controls['ownerEmail'].value,
      copyright: this.ownerFormGroup.controls['copyright'].value
    };

    this.showService.createShow(formData).subscribe(response => {
      console.log(response);
    });
  }

  uploadFile($event: Event): void {
    console.log($event);
  }
}
