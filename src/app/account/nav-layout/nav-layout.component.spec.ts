import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NavLayoutComponent} from './nav-layout.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from 'src/app/auth.service';
import {test_imports} from 'src/testing/imports.spec';
import {AppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {exportStarted} from '../../store/app/actions/app.actions';
import {of} from 'rxjs';

class AuthServiceMock {
    login(body: any) {
        return of(true);
    }

    logout(body: any) {
        return of(true);
    }

    getRoles(body: any) {
        return of(true);
    }
    isLoggedIn() {
        return true;
    }
}

describe('NavLayoutComponent', () => {
    let component: NavLayoutComponent;
    let fixture: ComponentFixture<NavLayoutComponent>;
    let store: Store<AppState>;
    const authServiceMock: AuthServiceMock = new AuthServiceMock();

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [NavLayoutComponent],
            imports: [
                test_imports
            ],
            providers: [
                Store,
                JwtHelperService,
                { provide: AuthService, useValue: authServiceMock },
                {provide: JWT_OPTIONS, useValue: {}}
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

    }));
    beforeEach(() => {
        store = TestBed.get<Store<AppState>>(Store);
        fixture = TestBed.createComponent(NavLayoutComponent);
        component = fixture.componentInstance;
        store.dispatch(exportStarted( {data: 'test_export'}));
        fixture.detectChanges();
    });


    it('should compile', () => {
        expect(component).toBeTruthy();
    });

    it('store test', () => {
        component.export_name$.subscribe(r => expect(r).toBe('test_export'));
    });

});
