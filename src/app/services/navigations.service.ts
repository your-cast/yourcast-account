import {Injectable} from '@angular/core';
import {NavItem} from '../models/nav-item';
import {UserRole} from '../users/model/UserRole';
import {PermissionsService} from './permissions.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationsService {
  constructor(
    private permissionService: PermissionsService
  ) {
  }

  isAllow(roles: string[]): boolean {
    let isAllowed = true;
    roles.forEach(role => {
      if (this.permissionService.getUserPermissions().includes(role)) {
        isAllowed = false;
      }
    });
    return isAllowed;
  }

  getNavigationItems(): NavItem[] {
    return [
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
        route: 'shows',
        disabled: this.isAllow([
          UserRole.SHOW_READ
        ]),
        children: [
          {
            id: 'show-list-menu',
            displayName: 'List shows',
            iconName: 'contactless',
            route: 'shows/list',
            disabled: this.isAllow([
              UserRole.SHOW_READ
            ]),
          },
          {
            id: 'show-create-menu',
            displayName: 'Create show',
            iconName: 'add_circle',
            route: 'shows/create',
            disabled: this.isAllow([
              UserRole.SHOW_WRITE
            ]),
          }
        ]
      },
      {
        id: 'podcasts-menu',
        displayName: 'Episodes',
        iconName: 'podcasts',
        route: 'episodes',
        disabled: this.isAllow([
          UserRole.EPISODES_READ
        ]),
        children: [
          {
            id: 'podcast-create-menu',
            displayName: 'Create episode',
            iconName: 'add_circle',
            route: 'episodes/create',
            disabled: this.isAllow([
              UserRole.EPISODES_WRITE
            ]),
          }
        ]
      },

      {
        id: 'plans-menu',
        displayName: 'Plans',
        iconName: 'payments',
        route: 'plans',
        disabled: true
      },
      {
        id: 'news-menu',
        displayName: 'News',
        iconName: 'newspaper',
        route: 'news',
        disabled: this.isAllow([
          UserRole.NEWS_READ
        ]),
        children: [
          {
            id: 'news-create-menu',
            displayName: 'Create news',
            iconName: 'add_circle',
            route: 'news/create',
            disabled: this.isAllow([
              UserRole.NEWS_WRITE
            ]),
          },
          {
            id: 'news-list-menu',
            displayName: 'News list',
            iconName: 'feed',
            route: 'news/list',
            disabled: this.isAllow([
              UserRole.NEWS_READ
            ]),
          }
        ]
      },
      {
        id: 'subscriber-menu',
        displayName: 'Subscribers',
        iconName: 'unsubscribe',
        route: 'subscriber',
        disabled: this.isAllow([
          UserRole.SUBSCRIBERS_READ,
          UserRole.SUBSCRIBERS_WRITE,
        ]),
      },
      {
        id: 'contacts-menu',
        displayName: 'Contacts form',
        iconName: 'mark_email_unread',
        route: 'contacts',
        disabled: this.isAllow([
          UserRole.CONTACTS_READ,
          UserRole.CONTACTS_WRITE,
        ]),
      },
      {
        id: 'support-menu',
        displayName: 'Support',
        iconName: 'drafts',
        route: 'support',
        disabled: this.isAllow([
          UserRole.SUPPORT_READ,
          UserRole.SUPPORT_WRITE,
        ]),
      },
      {
        id: 'users-menu',
        displayName: 'Users',
        iconName: 'people',
        route: 'users/list',
        disabled: this.isAllow([
          UserRole.USER_READ,
          UserRole.USER_WRITE,
        ]),
      },
      {
        id: 'settings-menu',
        displayName: 'Settings',
        iconName: 'settings',
        route: 'settings',
        disabled: this.isAllow([
          UserRole.SETTINGS_READ,
          UserRole.SETTINGS_WRITE,
        ]),
        children: [
          {
            id: 'languages-menu',
            displayName: 'Languages',
            iconName: 'languages',
            route: 'settings/languages'
          },
          {
            id: 'timezones-menu',
            displayName: 'Timezones',
            iconName: 'schedule',
            route: 'settings/timezones'
          },
          {
            id: 'categories-menu',
            displayName: 'Categories',
            iconName: 'account_tree',
            route: 'settings/categories'
          }
        ]
      }
    ];
  }
}
