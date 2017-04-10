import { Component, OnInit, Input }        from '@angular/core';
import { Router, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { AccountService } from './../../services/account/account.service';
import { UserService } from './../../services/user/user.service';
import { User }        from './../../models/user';

@Component({
    selector: 'c-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.css' ]
})

export class HeaderComponent implements OnInit{
    constructor(
        private accountService: AccountService,
        private userService: UserService,
        private router: Router,
        private location: Location
    ) {}

    @Input() title: string;
    user = new User();

    ngOnInit(): void {

        this.userService.getCurrentUser()
            .then(user => {
                this.user = user;
                if(!this.title)
                {
                    this.title = "Hello, " + user.name;
                }
            });
    }

    logout(){
        this.accountService.logout();
        this.router.navigate(['/login']);
    }
}