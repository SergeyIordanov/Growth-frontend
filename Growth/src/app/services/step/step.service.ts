import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Kid } from './../../models/kid';
import { Path } from './../../models/path';
import { Goal } from './../../models/goal';
import { Step } from './../../models/step';

@Injectable()
export class StepService {

    private urlPrefix = 'api/users';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getAll(userId: number, kidId: number, pathId: number, goalId: number): Promise<Step[]> {
        const url = `${this.urlPrefix}/${userId}`;

        return this.http.get(this.urlPrefix)
                .toPromise()
                .then(response => { 
                    var data = response.json().data;
                    var kids = data[0].Kids as Kid[];
                    var paths =  data[0].Kids[kids.findIndex(k => k.id == kidId)].Paths as Path[];
                    var goals = data[0].Kids[kids.findIndex(k => k.id == kidId)].Paths[paths.findIndex(p => p.id == pathId)].Goals as Goal[];
                    return data[0]
                        .Kids[kids.findIndex(k => k.id == kidId)]
                        .Paths[paths.findIndex(p => p.id == pathId)]
                        .Goals[goals.findIndex(g => g.id == goalId)]
                        .Steps as Step[];
                })
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