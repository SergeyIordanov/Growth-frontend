import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './../services/in-memory-data.service';

import { AppComponent }         from './../components/app/app.component';
import { HomeComponent }         from './../components/home/home.component';
import { HeaderComponent }         from './../components/header/header.component';
import { NavComponent }         from './../components/nav/nav.component';

import { UserService }  from './../services/user/user.service';
import { KidService }  from './../services/kid/kid.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavComponent
  ],
  providers: [ 
    UserService, 
    KidService 
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }