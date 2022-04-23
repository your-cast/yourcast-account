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
        route: 'shows',
        children: [
          {
            id: 'show-create-menu',
            displayName: 'Create show',
            iconName: 'add_circle',
            route: 'shows/create'
          },
          {
            id: 'show-list-menu',
            displayName: 'List shows',
            iconName: 'contactless',
            route: 'shows/list'
          }
        ]
      },
      {
        id: 'podcasts-menu',
        displayName: 'Episodes',
        iconName: 'podcasts',
        route: 'episodes',
        children: [
          {
            id: 'podcast-create-menu',
            displayName: 'Create episode',
            iconName: 'add_circle',
            route: 'episodes/create'
          }
        ]
      },

      {
        id: 'plans-menu',
        displayName: 'Plans',
        iconName: 'payments',
        route: 'plans'
      },
      {
        id: 'news-menu',
        displayName: 'News',
        iconName: 'newspaper',
        route: 'news',
        children: [
          {
            id: 'news-create-menu',
            displayName: 'Create news',
            iconName: 'add_circle',
            route: 'news/create'
          },
          {
            id: 'news-list-menu',
            displayName: 'News list',
            iconName: 'feed',
            route: 'news/list'
          }
        ]
      },
      {
        id: 'subscriber-menu',
        displayName: 'Subscribers',
        iconName: 'unsubscribe',
        route: 'subscriber'
      },
      {
        id: 'contacts-menu',
        displayName: 'Contacts form',
        iconName: 'mark_email_unread',
        route: 'contacts'
      },
      {
        id: 'support-menu',
        displayName: 'Support',
        iconName: 'drafts',
        route: 'support'
      },
      {
        id: 'list-menu',
        displayName: 'Users',
        iconName: 'people',
        route: 'users/list'
      },
      {
        id: 'settings-menu',
        displayName: 'Settings',
        iconName: 'settings',
        route: 'settings',
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
