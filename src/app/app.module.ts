import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { StoreModule } from '@ngrx/store';
import { MostModule } from '@themost/angular';
import { AuthModule } from '@themost/angular';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    InfiniteScrollModule,
    BsDropdownModule.forRoot(),
    StoreModule.forRoot({}),
    MostModule.forRoot({
      // use runkit endpoint
      base: 'http://localhost:8080/api/',
      options: {
        useMediaTypeExtensions: false,
        useResponseConversion: true
      }
    }),
    AuthModule.forRoot({
      // use runkit endpoint
      login: 'http://localhost:8080/auth/login',
      client_id: '9165351833584149',
      scope: [
        'profile'
      ],
      callback: 'http://localhost:8080/user/auth/callback',
      locations: [
        {
          path: '^/customers',
          account: 'anonymous',
          redirectTo: '/user/auth/login',
          mask: 0
        }
      ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
