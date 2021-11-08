import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '@angular/cdk/layout';
import {MatIconModule} from '@angular/material/icon';
import {MatComponentsModule} from '../mat-components-module/mat-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    MatComponentsModule,
    MatIconModule
  ]
})
export class SharedModule {
}
