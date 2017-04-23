import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AccountService } from './../account/account.service';
import { Step } from './../../models/step';

@Injectable()
export class StepService {

    //private urlPrefix = 'http://growth-app.azurewebsites.net/api/me/kids';
    private urlPrefix = 'http://localhost:5000/api/me/kids';
    private headers = new Headers({
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + this.accountService.token()
    });

        constructor(
        private http: Http,
        private accountService: AccountService
    ) { }

    getAll(kidId: string, pathId: string, goalId: string): Promise<Step[]> {
        const url = `${this.urlPrefix}/${kidId}/paths/${pathId}/goals/${goalId}/steps`;

        return this.http.get(url, {headers: this.headers})
                .toPromise()
                .then(response => response.json() as Step[])
                .catch(this.handleError);
    }

    get(kidId: string, pathId: string, goalId: string, id: string): Promise<Step> {
        const url = `${this.urlPrefix}/${kidId}/paths/${pathId}/goals/${goalId}/steps/${id}`;
        
        return this.http.get(url, {headers: this.headers})
                .toPromise()
                .then(response => response.json() as Step)
                .catch(this.handleError);
    }

    update(kidId: string, pathId: string, goalId: string, step: Step): Promise<string> {
        const url = `${this.urlPrefix}/${kidId}/paths/${pathId}/goals/${goalId}/steps`;

        return this.http
            .put(url, JSON.stringify(step), {headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    create(kidId: string, pathId: string, goalId: string, step: Step): Promise<string> {
        const url = `${this.urlPrefix}/${kidId}/paths/${pathId}/goals/${goalId}/steps`;

        return this.http
            .post(url, JSON.stringify(step), {headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    delete(kidId: string, pathId: string, goalId: string, id: string): Promise<void> {
        const url = `${this.urlPrefix}/${kidId}/paths/${pathId}/goals/${goalId}/steps/${id}`;
        
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