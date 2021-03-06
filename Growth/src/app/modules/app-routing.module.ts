import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './../components/home/home.component';
import { ProfileComponent }   from './../components/profile/profile.component';
import { LoginComponent }   from './../components/login/login.component';
import { RegisterComponent }   from './../components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'me',  component: HomeComponent },
  { path: 'me/kids/:kidId',  component: ProfileComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}