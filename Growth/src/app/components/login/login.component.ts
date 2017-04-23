import { Component, OnInit, Input } from '@angular/core';
import { Router }           from '@angular/router';
import { Location }         from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { AccountService }   from './../../services/account/account.service';
import { LoginModel }       from './../../models/loginModel';
import { Token }            from './../../models/token';

@Component({
    selector: 'c-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ]
})

export class LoginComponent implements OnInit {

    constructor(
        private accountService : AccountService,
        private router: Router
    ) {}

    loginModel = new LoginModel();
    errorModel = new LoginModel();
    errorMessage : string;

    ngOnInit(): void {
        if(this.accountService.token()){
            this.router.navigate(['/me'])
        }
    }

    login(): void {
        this.accountService.login(this.loginModel)
                .then(token => this.router.navigate(['/me']))
                .catch(error => {
                    this.errorMessage = error.value
                    this.errorModel = error;
                }); 
    }   
}