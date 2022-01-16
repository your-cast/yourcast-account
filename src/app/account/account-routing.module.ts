import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavLayoutComponent} from './nav-layout/nav-layout.component';
import {AuthGuard} from '../guard/auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ShowCreateComponent} from './shows/create/show-create.component';
import {EmailConfirmComponent} from './email-confirm/email-confirm.component';
import {ShowListComponent} from './shows/list/show-list.component';
import {ShowDetailComponent} from './shows/detail/show-detail.component';
import {PodcastCreateComponent} from './podcasts/create/podcast-create.component';
import {UsersListComponent} from './users/list/users-list.component';

const routes: Routes = [
  {
    path: '',
    component: NavLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'confirm-email',
        component: EmailConfirmComponent
      },
      {
        path: 'shows/create',
        component: ShowCreateComponent
      },
      {
        path: 'shows/list',
        component: ShowListComponent
      },
      {
        path: 'shows/details/:id',
        component: ShowDetailComponent
      },
      {
        path: 'episodes/create',
        component: PodcastCreateComponent
      },
      {
        path: 'episodes/list',
        component: ShowListComponent
      },
      {
        path: 'users/list',
        component: UsersListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
