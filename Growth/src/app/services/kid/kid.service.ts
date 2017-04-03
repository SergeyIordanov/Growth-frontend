import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Kid } from './../../models/kid';

@Injectable()
export class KidService {

    private urlPrefix = 'api/users';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getAll(userId: number): Promise<Kid[]> {
        const url = `${this.urlPrefix}/${userId}`;

        return this.http.get(this.urlPrefix)
                .toPromise()
                .then(response => { 
                    var data = response.json().data;
                    return data[0].Kids as Kid[]
                })
                .catch(this.handleError);
    }

    get(userId: number, id: number): Promise<Kid> {
        const url = `${this.urlPrefix}/${userId}`;
        
        return this.http.get(url)
                .toPromise()
                .then(response => (response.json().data[0].Kids as Kid[]).find(k => k.id === id))
                .catch(this.handleError);
    }

    update(userId: number, kid: Kid): Promise<Kid> {
        const url = `${this.urlPrefix}/${userId}/kids/${kid.id}`;

        return this.http
            .put(url, JSON.stringify(kid), {headers: this.headers})
            .toPromise()
            .then(() => kid)
            .catch(this.handleError);
    }

    create(userId: number, kid: Kid): Promise<Kid> {
        const url = `${this.urlPrefix}/${userId}/kids`;

        return this.http
            .post(this.urlPrefix, JSON.stringify(kid), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data as Kid)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.urlPrefix}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // TODO for demo purposes only
        
        return Promise.reject(error.message || error);
    }
}