import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '@angular/cdk/layout';
import {MatIconModule} from '@angular/material/icon';
import {MatComponentsModule} from '../mat-components-module/mat-components.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NavLayoutComponent} from './nav-layout/nav-layout.component';
import {MenuListItemComponent} from './menu-list-item/menu-list-item.component';
import {AccountRoutingModule} from './account-routing.module';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    DashboardComponent,
    NavLayoutComponent,
    MenuListItemComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    MatComponentsModule,
    MatIconModule,
    AccountRoutingModule,
  ]
})
export class AccountModule {
}
