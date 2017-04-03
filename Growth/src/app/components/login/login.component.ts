import { Component, Input }                 from '@angular/core';
import { ActivatedRoute, Router, Params }   from '@angular/router';
import { Location }                         from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { LoginModel } from './../../models/loginModel';

@Component({
    selector: 'c-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ]
})

export class LoginComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {}

    loginModel = new LoginModel();

    login(): void {
        // todo login
        this.router.navigate(['/users', 1]);
    }
}