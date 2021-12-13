import {NgModule} from '@angular/core';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {MatComponentsModule} from '../mat-components-module/mat-components.module';
import {Footer} from './footer/footer';

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
    MatComponentsModule
  ]
})
export class SharedModule {
}
