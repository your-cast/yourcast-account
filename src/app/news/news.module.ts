import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '@angular/cdk/layout';
import {MaterialModule} from '../material/material.module';
import {NewsCreateComponent} from './create/news-create.component';
import {NewsListComponent} from './list/news-list.component';
import {SharedModule} from '../shared/shared.module';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    NewsCreateComponent,
    NewsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CKEditorModule,
  ]
})

export class NewsModule {
}
