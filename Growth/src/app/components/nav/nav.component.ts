import { Component, Input, OnInit }                 from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { KidService } from './../../services/kid/kid.service';
import { Kid }        from './../../models/kid';

@Component({
    selector: 'c-nav',
    templateUrl: './nav.component.html',
    styleUrls: [ './nav.component.css' ]
})

export class NavComponent implements OnInit {
    constructor(
        private kidService: KidService
    ) {}

    @Input() selectedKidId: string;
    kids: Kid[];

    ngOnInit(): void {
        this.getKids();       
    }

    private getKids(): void {
        this.kidService.getAll().then(kids => this.kids = kids);
    }
}