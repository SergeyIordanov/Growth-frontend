import { Component, Input }                 from '@angular/core';
import { ActivatedRoute, Router, Params }   from '@angular/router';
import { Location }                         from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { KidService } from './../../services/kid/kid.service';
import { Kid }        from './../../models/kid';

@Component({
    selector: 'c-nav',
    templateUrl: './nav.component.html',
    styleUrls: [ './nav.component.css' ]
})

export class NavComponent {
    constructor(
        private kidService: KidService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {}

    @Input() selectedKidId: number;
    userId: number;
    kids: Kid[];

    ngOnInit(): void {
        this.userId = +this.route.snapshot.params['userId'];
        this.getKids();
        
    }

    getKids(): void {
        this.kidService.getAll(this.userId).then(kids => this.kids = kids);
    }
}