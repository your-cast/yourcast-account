import {NgModule} from '@angular/core';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {PageContentComponent} from './page-content/page-content.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {Footer} from './footer/footer';
import {MaterialModule} from '../material/material.module';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    NotFoundComponent,
    PageContentComponent,
    Footer
  ],
  exports: [
    BreadcrumbsComponent,
    NotFoundComponent,
    PageContentComponent,
    Footer
  ],
  imports: [
    MaterialModule
  ]
})
export class SharedModule {
}
