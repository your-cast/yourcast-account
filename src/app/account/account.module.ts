import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '@angular/cdk/layout';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EmailConfirmComponent} from './email-confirm/email-confirm.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../material/material.module';
import {ShowCreateComponent} from './shows/create/show-create.component';
import {ShowListComponent} from './shows/list/show-list.component';
import {ShowDetailComponent} from './shows/detail/show-detail.component';
import {PodcastCreateComponent} from './podcasts/create/podcast-create.component';
import {NgxAudioPlayerModule} from 'ngx-audio-player';
import {UsersListComponent} from './users/list/users-list.component';
import {UsersDetailComponent} from './users/detail/users-detail.component';
import {UserIpHistoryComponent} from './users/detail/user-ip-history/user-ip-history.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    DashboardComponent,
    ShowCreateComponent,
    ShowListComponent,
    ShowDetailComponent,
    PodcastCreateComponent,
    EmailConfirmComponent,
    UsersListComponent,
    UsersDetailComponent,
    UserIpHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CKEditorModule,
    NgxAudioPlayerModule
  ]
})
export class AccountModule {
}
