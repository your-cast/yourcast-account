import {NgModule} from '@angular/core';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {Footer} from './footer/footer';
import {MaterialModule} from '../material/material.module';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    NotFoundComponent,
    Footer
  ],
  exports: [
    BreadcrumbsComponent,
    NotFoundComponent,
    Footer
  ],
  imports: [
    MaterialModule
  ]
})
export class SharedModule {
}
