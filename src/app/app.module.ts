import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {MatComponentsModule} from './mat-components-module/mat-components.module';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {AccountModule} from './account/account.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    AccountModule,
    MatComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
