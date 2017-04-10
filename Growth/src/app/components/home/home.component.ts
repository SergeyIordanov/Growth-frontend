import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { UserService } from './../../services/user/user.service';
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
        private userService: UserService,
        private pathService: PathService,
        private kidService: KidService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    kids: Kid[];
    newKid = new Kid();

    ngOnInit(): void {
        this.getKidsWithPaths();        
    }

    addKid(){
        if(this.newKid.gender.trim() !== ""
            && this.newKid.name.trim() !== ""){
            this.kidService.create(this.newKid)
                .then();
        }

        this.getKidsWithPaths();  
    }

    private getKidsWithPaths(): void {
        this.kidService.getAll()
            .then(kids => {
                this.kids = kids;
                if(this.kids){
                    this.kids.forEach(kid => {
                        this.pathService.getAll(kid.id)
                            .then(paths => kid.paths = paths)
                    });
                }      
            });
    }
}