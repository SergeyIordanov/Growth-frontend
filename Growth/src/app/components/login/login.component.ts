import { Component, Input }                 from '@angular/core';
import { ActivatedRoute, Router, Params }   from '@angular/router';
import { Location }                         from '@angular/common';
import {CookieService}                      from 'angular2-cookie/core';
import 'rxjs/add/operator/switchMap';

import { AccountService }   from './../../services/account/account.service';
import { LoginModel }       from './../../models/loginModel';
import { Token }            from './../../models/token';
import { TokenCookie }            from './../../models/tokenCookie';

@Component({
    selector: 'c-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ]
})

export class LoginComponent {
    constructor(
        private accountService : AccountService,
        private cookieService : CookieService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {}

    loginModel = new LoginModel();
    errorModel = new LoginModel();
    errorMessage : string;

    login(): void {
        this.accountService.login(this.loginModel)
                .then(token => {
                    this.saveToken(token);
                    this.router.navigate(['/me'])
                })
                .catch(error => {
                    this.errorMessage = error.value
                    this.errorModel = error;
                }); 
    }

    private saveToken(token : Token){
        var now = new Date();
        now.setUTCSeconds(now.getUTCSeconds() + token.expiresIn);
        var tokenCookie = new TokenCookie(); 
        tokenCookie.token = token.token;
        tokenCookie.expiresDate = now;
        
        this.cookieService.putObject("growth_token", tokenCookie);
    }
}