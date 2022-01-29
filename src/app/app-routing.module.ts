import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegistrationComponent} from './auth/registration/registration.component';
import {AuthGuard} from './guard/auth.guard';
import {DashboardComponent} from './account/dashboard/dashboard.component';
import {EmailConfirmComponent} from './account/email-confirm/email-confirm.component';
import {ShowCreateComponent} from './account/shows/create/show-create.component';
import {ShowListComponent} from './account/shows/list/show-list.component';
import {ShowDetailComponent} from './account/shows/detail/show-detail.component';
import {PodcastCreateComponent} from './account/podcasts/create/podcast-create.component';
import {UsersListComponent} from './account/users/list/users-list.component';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
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
  },
  {
    path: 'auth',
    component: AppComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
