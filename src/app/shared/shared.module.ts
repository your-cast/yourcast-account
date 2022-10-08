import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {PageContentComponent} from './page-content/page-content.component';
import {NotificationComponent} from './notification/notification.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {MaterialModule} from '../material/material.module';
import {LoaderComponent} from './loader/loader.component';
import {Footer} from './footer/footer';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    NotFoundComponent,
    PageContentComponent,
    NotificationComponent,
    LoaderComponent,
    Footer
  ],
  exports: [
    BreadcrumbsComponent,
    NotFoundComponent,
    PageContentComponent,
    NotificationComponent,
    LoaderComponent,
    Footer
  ],
  imports: [
    MaterialModule,
    CommonModule
  ]
})
export class SharedModule {
}
