import {NgModule} from '@angular/core';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {MatComponentsModule} from '../mat-components-module/mat-components.module';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    NotFoundComponent
  ],
  exports: [
    BreadcrumbsComponent
  ],
  imports: [
    MatComponentsModule
  ]
})
export class SharedModule {
}
