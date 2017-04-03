import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Kid } from './../../models/kid';
import { Path } from './../../models/path';

@Injectable()
export class PathService {

    private urlPrefix = 'api/users';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getAll(userId: number, kidId: number): Promise<Path[]> {
        const url = `${this.urlPrefix}/${userId}`;

        return this.http.get(this.urlPrefix)
                .toPromise()
                .then(response => { 
                    var data = response.json().data;
                    var kids = data[0].Kids as Kid[];
                    return data[0].Kids[kids.findIndex(k => k.id == kidId)].Paths as Path[];
                })
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // TODO for demo purposes only
        
        return Promise.reject(error.message || error);
    }
}