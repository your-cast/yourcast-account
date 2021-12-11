import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '@angular/cdk/layout';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NavLayoutComponent} from './nav-layout/nav-layout.component';
import {MenuListItemComponent} from './menu-list-item/menu-list-item.component';
import {AccountRoutingModule} from './account-routing.module';
import {ShowCreateComponent} from './shows/create/show-create.component';
import {EmailConfirmComponent} from './email-confirm/email-confirm.component';
import {MatComponentsModule} from '../mat-components-module/mat-components.module';

@NgModule({
  declarations: [
    DashboardComponent,
    NavLayoutComponent,
    MenuListItemComponent,
    ShowCreateComponent,
    EmailConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    MatComponentsModule,
    AccountRoutingModule
  ]
})
export class AccountModule {
}
