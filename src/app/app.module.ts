import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { StoreModule } from '@ngrx/store';
import { MostModule } from '@themost/angular';
import { AuthModule } from '@themost/angular';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    StoreModule.forRoot({}),
    MostModule.forRoot({
      // use runkit endpoint
      base: 'https://themost-test-api-593pg070eky4.runkit.sh/api/',
      options: {
        useMediaTypeExtensions: false,
        useResponseConversion: true
      }
    }),
    AuthModule.forRoot({
      // use runkit endpoint
      login: 'https://themost-test-api-593pg070eky4.runkit.sh/auth/login',
      client_id: '9165351833584149',
      scope: [
        'profile'
      ],
      callback: 'http://localhost:8080/auth/callback'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
