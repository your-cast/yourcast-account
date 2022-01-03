import {Injectable} from '@angular/core';
import {NavItem} from '../models/nav-item';

@Injectable({
  providedIn: 'root'
})
export class NavigationsService {
  navigationItems: NavItem[] = [];

  constructor() {
    this.prepareItems()
  }

  getNavigationItems(): NavItem[] {
    return this.navigationItems;
  }

  prepareItems(): void {
    this.navigationItems = [
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
            id: 'show-create-menu',
            displayName: 'Create show',
            iconName: 'add_circle',
            route: 'account/shows/create'
          },
          {
            id: 'show-list-menu',
            displayName: 'List shows',
            iconName: 'contactless',
            route: 'account/shows/list'
          }
        ]
      },
      {
        id: 'podcasts-menu',
        displayName: 'Episodes',
        iconName: 'podcasts',
        route: 'account/episodes',
        children: [
          {
            id: 'podcast-create-menu',
            displayName: 'Create episode',
            iconName: 'add_circle',
            route: 'account/episodes/create'
          }
        ]
      },

      {
        id: 'plans-menu',
        displayName: 'Plans',
        iconName: 'payments',
        route: 'account/plans'
      },
      {
        id: 'access-tokens-menu',
        displayName: 'Access Tokens',
        iconName: 'fingerprint',
        route: 'admin/access-tokens'
      },
      {
        id: 'support-menu',
        displayName: 'Support',
        iconName: 'drafts',
        route: 'account/support'
      },
      {
        id: 'users-menu',
        displayName: 'Users',
        iconName: 'people',
        route: 'account/users'
      },
      {
        id: 'settings-menu',
        displayName: 'Settings',
        iconName: 'settings',
        route: 'admin/settings',
        children: [
          {
            id: 'languages-menu',
            displayName: 'Languages',
            iconName: 'languages',
            route: 'admin/settings/languages'
          },
          {
            id: 'timezones-menu',
            displayName: 'Timezones',
            iconName: 'schedule',
            route: 'admin/settings/timezones'
          },
          {
            id: 'categories-menu',
            displayName: 'Categories',
            iconName: 'account_tree',
            route: 'admin/settings/categories'
          }
        ]
      }
    ];
  }
}
