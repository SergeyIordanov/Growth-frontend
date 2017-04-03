import { Component, OnInit, Input }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { UserService } from './../../services/user/user.service';
import { User }        from './../../models/user';

@Component({
    selector: 'c-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.css' ]
})

export class HeaderComponent implements OnInit{
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    @Input() title: string;
    user = new User();

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.userService.get(+params['userId']))
            .subscribe(user => {
                this.user = user;
                if(!this.title)
                {
                    this.title = "Hello, " + user.Name;
                }
            });
    }
}