import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuListItemComponent} from './menu-list-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {ActivatedRoute, Router} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavItem} from './nav-item';

class MockRouter {
    route = jasmine.createSpy('route');
    url = '';
}


class MockItem implements NavItem {
    displayName: string;
    disabled?: boolean;
    iconName: string;
    route = '';
    children?: NavItem[];
}

describe('MenuListItemComponent', () => {
    let component: MenuListItemComponent;
    let fixture: ComponentFixture<MenuListItemComponent>;
    beforeEach(async (() => {
        const mockActiveRoute = {
            snapshot: {
                queryParamMap:
                    new Map([
                        ['returnUrl', '/']
                    ])

            }
        };
        TestBed.configureTestingModule({
            declarations: [
                MenuListItemComponent
            ],
            imports: [
                MatIconModule,
                BrowserModule,
                MatMenuModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
            ],
            providers: [
                HttpClient,
                HttpHandler,
                {provide: ActivatedRoute, useValue: mockActiveRoute},
                {provide: Router, useClass: MockRouter}

            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuListItemComponent);
        component = fixture.componentInstance;
        component.item = new MockItem();

        fixture.detectChanges();

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
