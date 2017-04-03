import { Component, Input }                 from '@angular/core';
import { ActivatedRoute, Router, Params }   from '@angular/router';
import { Location }                         from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { RegisterModel } from './../../models/registerModel';

@Component({
    selector: 'c-register',
    templateUrl: './register.component.html',
    styleUrls: [ './register.component.css' ]
})

export class RegisterComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {}

    registerModel = new RegisterModel();

    register(): void {
        // todo register
        this.router.navigate(['/login']);
    }
}