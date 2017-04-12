import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent }         from './../components/app/app.component';
import { HomeComponent }        from './../components/home/home.component';
import { HeaderComponent }      from './../components/header/header.component';
import { NavComponent }         from './../components/nav/nav.component';
import { ProfileComponent }     from './../components/profile/profile.component';
import { LoginComponent }     from './../components/login/login.component';
import { RegisterComponent }     from './../components/register/register.component';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AccountService }  from './../services/account/account.service';
import { UserService }  from './../services/user/user.service';
import { KidService }   from './../services/kid/kid.service';
import { PathService }  from './../services/path/path.service';
import { GoalService }  from './../services/goal/goal.service';
import { StepService }  from './../services/step/step.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [ 
    CookieService,
    AccountService,
    UserService, 
    KidService,
    PathService,
    GoalService,
    StepService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }