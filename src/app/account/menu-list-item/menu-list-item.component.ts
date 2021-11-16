import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {NavItem} from './nav-item';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      )
    ])
  ]
})

export class MenuListItemComponent implements OnInit {
  expanded = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: any;
  @Input() depth: any;

  constructor(public router: Router, public route: ActivatedRoute) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.expanded = this.router.url.indexOf(`/${this.item.route}`) === 0;
    this.ariaExpanded = this.expanded;
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      if (item.route === 'admin/logs') {
        const generatedDateFrom = new Date().setHours(0, 0, 0);
        const dateFrom = new DatePipe('en-US').transform(generatedDateFrom, 'yyyy-MM-ddTHH:mm:ss');
        this.router.navigate([item.route], {queryParams: {dateTimeFrom: dateFrom}});
      } else {
        this.router.navigate([item.route]);
      }

    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  isActiveRouteContainsItemRoute(): boolean {
    return '/'.concat(this.item.route) === this.router.url.split('?')[0];
  }
}
