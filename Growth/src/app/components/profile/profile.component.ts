import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

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
        private route: ActivatedRoute,
        private location: Location
    ) {}

    userId: number;
    kid = new Kid();
    selectedPath = new Path();

    ngOnInit(): void {
        this.userId = +this.route.snapshot.params['userId'];
        this.route.params 
            .switchMap((params: Params) => this.kidService.get(this.userId, +params['kidId'])) 
            .subscribe(kid => {
                this.kid = kid;
                this.getKidWithPaths();
                if(this.kid.Paths.length > 0)
                {
                    this.selectedPath = this.kid.Paths[0];
                    this.getGoalsWithSteps(this.selectedPath.id);
                }
            });           
    }

    setPath(pathId: number){
        this.selectedPath = this.kid.Paths.find(p => p.id === pathId);
        this.getGoalsWithSteps(this.selectedPath.id);
    }

    private getKidWithPaths(): void {
        this.pathService.getAll(this.userId, this.kid.id)
            .then(paths => {
                this.kid.Paths = paths;                      
            })
    }

    private getGoalsWithSteps(pathId: number){
        this.getGoals(this.kid.id, pathId).then(goals => {
            this.selectedPath.Goals = goals
            if(this.selectedPath.Goals){
                this.selectedPath.Goals.forEach(goal => {
                    this.getSteps(this.kid.id, this.selectedPath.id, goal.id).then(steps => {
                        goal.Steps = steps                                      
                    })
                });
            }
        })
    }

    private getPaths(kidId: number): Promise<Path[]> {
        return this.pathService.getAll(this.userId, kidId);
    }

    private getGoals(kidId: number, pathId: number): Promise<Goal[]> {
        return this.goalService.getAll(this.userId, kidId, pathId);
    }

    private getSteps(kidId: number, pathId: number, goalId: number): Promise<Step[]> {
        return this.stepService.getAll(this.userId, kidId, pathId, goalId);
    }
}