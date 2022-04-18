import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShowService} from '../../../services/show.service';
import {Param} from '../../../models/param';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert.service';
import {forkJoin, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DictionaryService} from '../../../services/dictionary.service';
import {Timezone} from '../../../models/timezone';
import {Language} from '../../../models/language';

@Component({
  selector: 'app-show-create',
  templateUrl: './show-create.component.html',
  styleUrls: ['./show-create.component.scss']
})
export class ShowCreateComponent implements OnInit {
  isLinear = true;
  timezones: Timezone[] = [];
  languages: Language[] = [];
  categories: any = [];
  firstSubcategory: any = [];
  secondSubcategory: any = [];
  thirdSubcategory: any = [];
  infoFormGroup: FormGroup;
  artworkFormGroup: FormGroup;
  formatFormGroup: FormGroup;
  otherFormGroup: FormGroup;
  categoryFormGroup: FormGroup;
  ownerFormGroup: FormGroup;

  filteredTimezones: Observable<any[]>;

  timezones$: Observable<any>;
  languages$: Observable<any>;
  categories$: Observable<any>;

  allRequestFinished$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private showService: ShowService,
    private dictionaryService: DictionaryService,
    private router: Router,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.prepareForm();
    this.prepareDictionary();
    this.subscribeValueChange();
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

    this.filteredTimezones = this.otherFormGroup.controls['timezone'].valueChanges.pipe(
      startWith(''),
      map(value => this.filterTimezone(value)),
    );
  }

  filterTimezone(value: string): string[] {
    const filterValue = value.toLowerCase();

    // @ts-ignore
    return this.timezones.filter(option => option.toLowerCase().includes(filterValue));
  }

  prepareDictionary(): void {
    this.timezones$ = this.dictionaryService.getTimezonesDictionary();
    this.languages$ = this.dictionaryService.getLanguagesDictionary();
    this.categories$ = this.dictionaryService.getCategoriesDictionary();

    this.allRequestFinished$ = forkJoin([this.timezones$, this.languages$, this.categories$]);

    this.allRequestFinished$.subscribe(value => {
      this.timezones = value[0].result;
      this.languages = value[1].result;
      this.categories = value[2].result;
    }, error => {
      this.alertService.error('Something want wrong!');
    });
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
      this.router.navigate(['/shows/list']);

      this.alertService.success('New show created!');
    });
  }

  uploadFile($event: Event): void {
    console.log($event);
  }
}
