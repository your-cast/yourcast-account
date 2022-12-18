import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '@angular/cdk/layout';
import {MaterialModule} from '../material/material.module';
import {SharedModule} from '../shared/shared.module';
import {UsersDetailComponent} from './components/detail/users-detail.component';
import {UserRolesComponent} from './components/detail/user-roles/user-roles.component';
import {UserIpHistoryComponent} from './components/detail/user-ip-history/user-ip-history.component';
import {UsersListComponent} from './components/list/users-list.component';
import {NotificationsComponent} from './components/notifications/notifications.component';

@NgModule({
  declarations: [
    UsersListComponent,
    UsersDetailComponent,
    UserRolesComponent,
    UserIpHistoryComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ]
})

export class UsersModule {
}
