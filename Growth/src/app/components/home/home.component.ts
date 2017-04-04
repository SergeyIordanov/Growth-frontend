import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { KidService } from './../../services/kid/kid.service';
import { PathService } from './../../services/path/path.service';
import { Kid }        from './../../models/kid';
import { Path }        from './../../models/path';

@Component({
    selector: 'c-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.css' ]
})

export class HomeComponent implements OnInit{
    constructor(
        private pathService: PathService,
        private kidService: KidService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    userId: number;
    kids: Kid[];
    newKid = new Kid();

    ngOnInit(): void {
        this.userId = +this.route.snapshot.params['userId'];
        this.getKidsWithPaths();    
    }

    addKid(){
        if(this.newKid.Gender.trim() !== ""
            && this.newKid.Name.trim() !== ""){
            this.kidService.create(this.userId, this.newKid)
                .then(kid => this.kids.push(kid));
        }

        this.getKidsWithPaths();  
    }

    private getKidsWithPaths(): void {
        this.kidService.getAll(this.userId)
            .then(kids => {
                this.kids = kids;
                if(this.kids){
                    this.kids.forEach(kid => {
                        this.pathService.getAll(this.userId, kid.id)
                            .then(paths => kid.Paths = paths)
                    });
                }      
            });
    }
}