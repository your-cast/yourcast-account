import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NavItem} from '../menu-list-item/nav-item';

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
      id: 'bookings-menu',
      displayName: 'Bookings',
      iconName: 'bookmark_outline',
      route: 'admin/bookings'
    },
    {
      id: 'transactions-menu',
      displayName: 'Transactions',
      iconName: 'bookmark_outline',
      route: 'admin/transactions'
    },
    {
      id: 'banners-menu',
      displayName: 'Banners',
      iconName: 'announcement',
      route: 'admin/banners'
    },
    {
      id: 'resellers-menu',
      displayName: 'Resellers',
      iconName: 'people',
      route: 'admin/resellers',
      children: [
        {
          id: 'resellers-list-menu',
          displayName: 'Resellers list',
          iconName: 'person_pin',
          route: 'admin/resellers/resellers-list'
        },
        {
          id: 'resellers-user-list-menu',
          displayName: 'Reseller\'s user list',
          iconName: 'supervisor_account',
          route: 'admin/resellers/users-list'
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
      id: 'suppliers-menu',
      displayName: 'Suppliers',
      iconName: 'local_atm',
      route: 'admin/suppliers'
    },
    {
      id: 'logs-menu',
      displayName: 'Logs',
      iconName: 'code',
      route: 'admin/logs'
    },
    {
      id: 'users-menu',
      displayName: 'Users',
      iconName: 'supervisor_account',
      route: 'admin/users'
    },
    {
      id: 'sftp-export-menu',
      displayName: 'SFTP-export',
      iconName: 'folder',
      route: 'admin/file-sharing-keys'
    },
    {
      id: 'access-tokens-menu',
      displayName: 'Access Tokens',
      iconName: 'fingerprint',
      route: 'admin/access-tokens'
    },
    {
      id: 'transporters-menu',
      displayName: 'Transporters',
      iconName: 'commute',
      route: 'admin/transporters'

    },
    {
      id: 'markets-menu',
      displayName: 'Markets',
      iconName: 'language',
      route: 'admin/markets'

    },
    {
      id: 'console-commands-menu',
      displayName: 'Console commands',
      iconName: 'tab',
      route: 'admin/console-commands'

    }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Large, Breakpoints.XLarge])
    .pipe(
      map(result => !result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
