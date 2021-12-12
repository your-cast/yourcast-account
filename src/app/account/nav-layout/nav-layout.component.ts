import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NavItem} from '../../models/nav-item';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-nav-layout',
  templateUrl: './nav-layout.component.html',
  styleUrls: ['./nav-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavLayoutComponent implements OnInit, OnDestroy {
  navItems: NavItem[] = [
    {
      id: 'home-menu',
      displayName: 'Home',
      iconName: 'home',
      route: 'admin'
    },
    {
      id: 'shows-menu',
      displayName: 'Shows',
      iconName: 'sensors',
      route: 'account/shows',
      children: [
        {
          id: 'shows-create-menu',
          displayName: 'Create shows',
          iconName: 'add_circle',
          route: 'account/shows/create'
        },
        {
          id: 'list-shows-menu',
          displayName: 'List shows',
          iconName: 'contactless',
          route: 'account/shows'
        }
      ]
    },
    {
      id: 'settings-menu',
      displayName: 'Settings',
      iconName: 'settings',
      route: 'admin/settings',
      children: [
        {
          id: 'search-settings-menu',
          displayName: 'Search',
          iconName: 'search',
          route: 'admin/settings/search'
        },
        {
          id: 'risk-menu',
          displayName: 'Risk',
          iconName: 'security',
          route: 'admin/settings/risk'
        }
      ]
    },
    {
      id: 'support-menu',
      displayName: 'Support',
      iconName: 'drafts',
      route: 'account/support'
    },
    {
      id: 'access-tokens-menu',
      displayName: 'Access Tokens',
      iconName: 'fingerprint',
      route: 'admin/access-tokens'
    },
    {
      id: 'users-menu',
      displayName: 'Users',
      iconName: 'people',
      route: 'account/users'
    },
    {
      id: 'plans-menu',
      displayName: 'Plans',
      iconName: 'payments',
      route: 'account/plans'
    },
    {
      id: 'markets-menu',
      displayName: 'Markets',
      iconName: 'language',
      route: 'admin/markets'
    }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Large, Breakpoints.XLarge])
    .pipe(
      map(result => !result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  logOut(): void {
    this.authService.logout();
  }
}
