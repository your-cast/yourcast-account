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

@NgModule({
  declarations: [
    DashboardComponent,
    ShowCreateComponent,
    ShowListComponent,
    ShowDetailComponent,
    PodcastCreateComponent,
    EmailConfirmComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    NgxAudioPlayerModule
  ]
})
export class AccountModule {
}
