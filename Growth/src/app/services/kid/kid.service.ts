import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AccountService } from './../account/account.service';
import { User } from './../../models/user';
import { Kid } from './../../models/kid';

@Injectable()
export class KidService {

    private urlPrefix = 'http://growth-app.azurewebsites.net/api/me/kids';
    private headers = new Headers({
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + this.accountService.token()
    });
    

    constructor(
        private http: Http,
        private accountService: AccountService
    ) { }

    getAll(): Promise<Kid[]> {
        const url = `${this.urlPrefix}`;

        return this.http.get(url, {headers: this.headers})
                .toPromise()
                .then(response => response.json() as Kid[])
                .catch(this.handleError);
    }

    get(id: string): Promise<Kid> {
        const url = `${this.urlPrefix}/${id}`;
        
        return this.http.get(url, {headers: this.headers})
                .toPromise()
                .then(response => response.json() as Kid)
                .catch(this.handleError);
    }

    update(kid: Kid): Promise<string> {
        const url = `${this.urlPrefix}/${kid.Id}`;

        return this.http
            .put(url, JSON.stringify(kid), {headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    create(kid: Kid): Promise<string> {
        const url = `${this.urlPrefix}`;

        return this.http
            .post(url, JSON.stringify(kid), {headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        const url = `${this.urlPrefix}/${id}`;
        
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
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