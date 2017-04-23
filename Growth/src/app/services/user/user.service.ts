import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AccountService } from './../account/account.service';
import { User } from './../../models/user';

@Injectable()
export class UserService {

    //private urlPrefix = 'http://growth-app.azurewebsites.net/api';
    private urlPrefix = 'http://localhost:5000/api';
    private headers = new Headers({
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + this.accountService.token()
    });

    constructor(
        private http: Http,
        private accountService: AccountService
    ) { }

    getCurrentUser(): Promise<User> {
        const url = `${this.urlPrefix}/me`;
        
        return this.http.get(url, {headers: this.headers})
                .toPromise()
                .then(response => response.json() as User)
                .catch(this.handleError);
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