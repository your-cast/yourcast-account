import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NavItem} from '../../models/nav-item';
import {AuthService} from '../../services/auth.service';
import {NavigationsService} from '../../services/navigations.service';

@Component({
  selector: 'app-nav-layout',
  templateUrl: './nav-layout.component.html',
  styleUrls: ['./nav-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavLayoutComponent implements OnInit, OnDestroy {
  navItems: NavItem[] = []
  loading: boolean = true;
  hasShow: boolean = false;
  user: any = {};

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Large, Breakpoints.XLarge])
    .pipe(
      map(result => !result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private navigationsService: NavigationsService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.navItems = this.navigationsService.getNavigationItems();
    this.authService.profile().subscribe(response => {
      this.user = response.user;
      this.hasShow = response.hasShow;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
  }

  logOut(): void {
    this.authService.logout();
  }
}
