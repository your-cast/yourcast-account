import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavLayoutComponent} from './nav-layout/nav-layout.component';
import {AuthGuard} from '../guard/auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ShowCreateComponent} from './shows/create/show-create.component';
import {EmailConfirmComponent} from './email-confirm/email-confirm.component';

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
