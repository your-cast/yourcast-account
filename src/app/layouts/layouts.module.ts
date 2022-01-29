import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutModule} from '@angular/cdk/layout';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../material/material.module';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {MenuListItemComponent} from './main-layout/menu-list-item/menu-list-item.component';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  declarations: [
    MainLayoutComponent,
    MenuListItemComponent
  ],
  exports: [
    MainLayoutComponent,
    MenuListItemComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    LayoutModule,
    MaterialModule,
    SharedModule,
  ]
})
export class LayoutsModule {
}
