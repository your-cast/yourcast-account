import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthModule} from './auth/auth.module';
import {AccountModule} from './account/account.module';
import {SharedModule} from './shared/shared.module';
import {AppComponent} from './app.component';
import {AuthTokenInterceptor} from './interceptors/auth-token.interceptor';
import {MaterialModule} from './material/material.module';
import {TableComponent} from './common/table/table.component';
import {LayoutsModule} from './layouts/layouts.module';
import {Translations} from './pipes/translations';
import {NewsModule} from './news/news.module';
import {UsersModule} from './users/users.module';
import {StoreModule} from '@ngrx/store';
import {ROOT_REDUCER} from './store/root.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    Translations
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    AccountModule,
    NewsModule,
    UsersModule,
    LayoutsModule,
    MaterialModule,
    StoreModule.forRoot(ROOT_REDUCER, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.name === 'prod', // Restrict extension to log-only mode
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    }
  ]
})

export class AppModule {
}
