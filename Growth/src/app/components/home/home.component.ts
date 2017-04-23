import { Component, OnInit } from '@angular/core';
import {}                    from "jquery";
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
        private kidService: KidService
    ) {}

    kids: Kid[];
    newKid = new Kid();
    deletingId: string;
    errorModel = new Kid();
    errorMessage: string;

    ngOnInit(): void {
        this.getKidsWithPaths(); 
        this.resetNewKid();      
    }

    addKid(){
        this.kidService.create(this.newKid)
            .then(id => {
                this.kidService.get(id).then(kid => this.kids.push(kid));
                this.resetNewKid();
                (<any>$('#add_modal')).modal('hide')
            })
            .catch(error => {
                this.errorMessage = error.value
                this.errorModel = error;
            });
    }

    setDeletingId(id: string): void{
        this.deletingId = id;
    }

    removeKid(){
        if(this.deletingId){
            this.kidService.delete(this.deletingId)
                .then(() => this.kids = this.kids.filter(kid => kid.id !== this.deletingId));
        }
    }

    getBase64() : void {
        var file = (<any>$('#new_kid_photo'))[0].files[0];

        var reader = new FileReader();
        reader.onload = () => this.newKid.photo = reader.result;

        reader.readAsDataURL(file);       
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

    private resetNewKid(){
        this.newKid = new Kid();
        this.newKid.gender = "Male";
    }
}