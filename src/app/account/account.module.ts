import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '@angular/cdk/layout';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NavLayoutComponent} from './nav-layout/nav-layout.component';
import {MenuListItemComponent} from './menu-list-item/menu-list-item.component';
import {AccountRoutingModule} from './account-routing.module';
import {EmailConfirmComponent} from './email-confirm/email-confirm.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../material/material.module';
import {ShowCreateComponent} from './shows/create/show-create.component';
import {ShowListComponent} from './shows/list/show-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavLayoutComponent,
    MenuListItemComponent,
    ShowCreateComponent,
    ShowListComponent,
    EmailConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule {
}
