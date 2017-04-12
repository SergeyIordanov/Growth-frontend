import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {} from "jquery";

import { KidService }  from './../../services/kid/kid.service';
import { PathService } from './../../services/path/path.service';
import { GoalService } from './../../services/goal/goal.service';
import { StepService } from './../../services/step/step.service';
import { Kid }         from './../../models/kid';
import { Path }        from './../../models/path';
import { Goal }        from './../../models/goal';
import { Step }        from './../../models/step';

@Component({
    selector: 'c-home',
    templateUrl: './profile.component.html',
    styleUrls: [ './profile.component.css' ]
})

export class ProfileComponent{
    constructor(
        private pathService: PathService,
        private goalService: GoalService,
        private stepService: StepService,
        private kidService: KidService,
        private route: ActivatedRoute
    ) {}

    kid = new Kid();
    selectedPath = new Path();

    ngOnInit(): void {
        this.route.params 
            .switchMap((params: Params) => this.kidService.get(params['kidId'])) 
            .subscribe(kid => {
                this.kid = kid;
                this.getKidWithPaths();
                if(this.kid.paths.length > 0)
                {
                    this.selectedPath = this.kid.paths[0];
                    this.getGoalsWithSteps(this.selectedPath.id);
                }
            });  

        (<any>$('.input-group.date.month-only')).datepicker({
            format: "mm/yyyy",
            startView: 1,
            minViewMode: 1
        });         
    }

    setPath(pathId: string){
        this.selectedPath = this.kid.paths.find(p => p.id === pathId);
        this.getGoalsWithSteps(this.selectedPath.id);
    }

    private getKidWithPaths(): void {
        this.pathService.getAll(this.kid.id)
            .then(paths => {
                this.kid.paths = paths;                      
            })
    }

    private getGoalsWithSteps(pathId: string){
        this.goalService.getAll(this.kid.id, pathId).then(goals => {
            this.selectedPath.goals = goals
            if(this.selectedPath.goals){
                this.selectedPath.goals.forEach(goal => {
                    this.stepService.getAll(this.kid.id, this.selectedPath.id, goal.id).then(steps => {
                        goal.steps = steps                                      
                    })
                });
            }
        })
    }
}