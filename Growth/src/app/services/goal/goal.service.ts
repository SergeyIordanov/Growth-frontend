import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AccountService } from './../account/account.service';
import { Goal } from './../../models/goal';

@Injectable()
export class GoalService {

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

    getAll(kidId: string, pathId: string): Promise<Goal[]> {
        const url = `${this.urlPrefix}/${kidId}/paths/${pathId}/goals`;

        return this.http.get(url, {headers: this.headers})
                .toPromise()
                .then(response => response.json() as Goal[])
                .catch(this.handleError);
    }

    get(kidId: string, pathId: string, id: string): Promise<Goal> {
        const url = `${this.urlPrefix}/${kidId}/paths/${pathId}/goals/${id}`;
        
        return this.http.get(url, {headers: this.headers})
                .toPromise()
                .then(response => response.json() as Goal)
                .catch(this.handleError);
    }

    update(kidId: string, pathId: string, goal: Goal): Promise<string> {
        const url = `${this.urlPrefix}/${kidId}/paths/${pathId}/goals`;

        return this.http
            .put(url, JSON.stringify(goal), {headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    create(kidId: string, pathId: string, goal: Goal): Promise<string> {
        const url = `${this.urlPrefix}/${kidId}/paths/${pathId}/goals`;

        return this.http
            .post(url, JSON.stringify(goal), {headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    delete(kidId: string, pathId: string, id: string): Promise<void> {
        const url = `${this.urlPrefix}/${kidId}/paths/${pathId}/goals/${id}`;
        
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