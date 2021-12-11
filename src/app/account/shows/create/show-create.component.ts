import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShowService} from '../../../services/show.service';

interface Timezone {
    value: string;
    name: string;
}

interface Language {
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
    timezones: Timezone[] = [];
    languages: Language[] = [];
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
            format: ['', Validators.required]
        });
        this.otherFormGroup = this.formBuilder.group({
            timezone: ['', Validators.required],
            language: ['', Validators.required],
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
            copyright: [''],
        });
    }

    prepareTimezones(): void {
        this.timezones = [
            {value: 'steak-0', name: 'Steak'},
            {value: 'pizza-1', name: 'Pizza'},
            {value: 'tacos-2', name: 'Tacos'}
        ];
    }

    prepareLanguages(): void {
        this.languages = [
            {value: 'steak-0', name: 'Steak'},
            {value: 'pizza-1', name: 'Pizza'},
            {value: 'tacos-2', name: 'Tacos'}
        ];
    }

    submitForm() {
        this.showService.createShow({}).subscribe();
    }
}
