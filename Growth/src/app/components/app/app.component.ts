import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { AccountService } from './../../services/account/account.service';

@Component({
    selector: 'my-app',
    template: `<router-outlet></router-outlet>`
})

export class AppComponent implements OnInit {

    constructor(
        private accountService: AccountService,
        private router: Router
    ) {}

    ngOnInit(): void {
        if(!this.accountService.token()){
            this.router.navigate(['/login'])
        }
    }
}