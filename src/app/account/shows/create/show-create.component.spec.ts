import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './show-create.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AuthService} from '../auth.service';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {test_imports} from '../../testing/imports.spec';

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

describe('LoginComponent', () => {
    const router = {
        navigate: jasmine.createSpy('navigate'),
    };
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    const authServiceMock: AuthServiceMock = new AuthServiceMock();
    let mockActiveRoute;
    beforeEach(async(() => {
        mockActiveRoute = {
            snapshot: {
                queryParamMap:
                    new Map([
                        ['returnUrl', '/']
                    ])

            }
        };
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [
                JwtHelperService,
                { provide: AuthService, useValue: authServiceMock },
                { provide: Router, useValue: router },
                { provide: ActivatedRoute, useValue: mockActiveRoute },
                { provide: JWT_OPTIONS, useValue: {} }
            ],
            imports: [
                test_imports
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Form invalid when empty', () => {
        expect(component.form.valid).toBeFalsy();
    });

    it('Username field validity', () => {
        const username = component.form.controls['username'];
        expect(username.valid).toBeFalsy();

        let errors = {};
        errors = username.errors || {};
        expect(errors['required']).toBeTruthy();
    });


    it('Password field validity', () => {
        const password = component.form.controls['password'];
        expect(password.valid).toBeFalsy();

        let errors = {};
        errors = password.errors || {};
        expect(errors['required']).toBeTruthy();
    });



});
