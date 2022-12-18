import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NavItem} from '../../models/nav-item';
import {AuthService} from '../../services/auth.service';
import {NavigationsService} from '../../services/navigations.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  navItems: NavItem[] = []
  loading: boolean = true;
  hasShow: boolean = false;
  user: any = {};
  notifications: [] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Large, Breakpoints.XLarge])
    .pipe(
      map(result => !result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private navigationsService: NavigationsService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.profile().subscribe((response: any) => {
      this.user = response.user;
      this.hasShow = response.hasShow;
      this.notifications = response.notifications;
      this.navItems = this.navigationsService.getNavigationItems();
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
  }

  logOut(): void {
    this.authService.logout();
  }

  handleMoveToDetail(id: string) {
    this.router.navigate(['/users/detail/' + id]);
  }

  handleMoveToNotifications(id: string) {
    this.router.navigate(['/notifications']);
  }
}
