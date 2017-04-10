import { Component, Input }                 from '@angular/core';
import { ActivatedRoute, Router, Params }   from '@angular/router';
import { Location }                         from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { AccountService } from './../../services/account/account.service';
import { RegisterModel } from './../../models/registerModel';

@Component({
    selector: 'c-register',
    templateUrl: './register.component.html',
    styleUrls: [ './register.component.css' ]
})

export class RegisterComponent {
    constructor(
        private accountService : AccountService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {}

    registerModel = new RegisterModel();
    errorModel = new RegisterModel();
    errorMessage : string;

    register(): void {
        this.accountService.register(this.registerModel)
                .then(() => this.router.navigate(['/login']))
                .catch(error => {
                    this.errorMessage = error.value
                    this.errorModel = error;
                });       
    }
}