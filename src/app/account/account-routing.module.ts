import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavLayoutComponent} from './nav-layout/nav-layout.component';
import {AuthGuard} from '../guard/auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';

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
        path: 'shows/create',
        component: DashboardComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
