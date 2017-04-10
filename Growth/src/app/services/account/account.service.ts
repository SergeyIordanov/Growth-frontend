import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import {CookieService}   from 'angular2-cookie/core';
import 'rxjs/add/operator/toPromise';

import { User } from './../../models/user';
import { RegisterModel } from './../../models/registerModel';
import { LoginModel } from './../../models/loginModel';
import { Token } from './../../models/token';
import { TokenCookie } from './../../models/tokenCookie';

@Injectable()
export class AccountService {

    private urlPrefix = 'http://growth-app.azurewebsites.net/api';
    private jsonHeaders = new Headers({'Content-Type': 'application/json'});
    private formHeaders = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    constructor(
        private http: Http,
        private cookieService: CookieService
    ) { }

    register(registerModel: RegisterModel): Promise<string> {
        const url = `${this.urlPrefix}/register`;
        
        return this.http.post(url, JSON.stringify(registerModel), {headers: this.jsonHeaders})
                .toPromise()
                .then(response => response.toString())
                .catch(this.handleError);
    }

    login(loginModel: LoginModel): Promise<Token> {
        const url = `${this.urlPrefix}/token`;
        
        var requestBody = `username=${loginModel.Email}&password=${loginModel.Password}`;
        return this.http.post(url, requestBody, {headers: this.formHeaders})
                .toPromise()
                .then(response => response.json() as Token)
                .catch(this.handleError);
    }

    logout(): void {
        this.cookieService.remove("growth_token");
    }

    token(): string {
        var token = this.cookieService.getObject("growth_token") as TokenCookie;

        if(token){
            return token.Token;
        }

        return undefined;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);

        var errorObj : any;

        try{
            errorObj = JSON.parse(error._body);
        }
        catch(ex){
            errorObj = { 'value': error._body }
        };

        return Promise.reject(errorObj || error);
    }
}