import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from './../../models/user';

@Injectable()
export class UserService {

    private urlPrefix = 'api/users';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getAll(): Promise<User[]> {
        return this.http.get(this.urlPrefix)
                .toPromise()
                .then(response => response.json().data as User[])
                .catch(this.handleError);
    }

    get(id: number): Promise<User> {
        const url = `${this.urlPrefix}/${id}`;
        
        return this.http.get(url)
                .toPromise()
                .then(response => response.json().data as User)
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // TODO for demo purposes only
        
        return Promise.reject(error.message || error);
    }
}