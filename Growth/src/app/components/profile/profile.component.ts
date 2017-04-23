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

    kidId: string;
    kid = new Kid();
    selectedPath: Path;

    newPath = new Path();
    updatingPath = new Path();
    deletingPathId: string;
    pathErrorModel = new Path();
    pathErrorMessage: string;

    newGoal = new Goal();
    deletingGoalId: string;
    goalErrorModel = new Goal();
    goalErrorMessage: string;

    newStep = new Step();
    goalId: string;
    stepErrorModel = new Step();
    stepErrorMessage: string;

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.kidId = params['kidId'];
            this.kidService.get(this.kidId)
                .then(kid => {
                    this.kid = kid;
                    this.getKidWithPaths();
                });
        }); 

        (<any>$('.input-group.date.month-only')).datepicker({
            format: "mm/yyyy",
            startView: 1,
            minViewMode: 1
        });         
    }

    addPath(){
        this.pathService.create(this.kidId, this.newPath)
            .then(id => {
                this.pathService.get(this.kidId, id).then(path => this.kid.paths.push(path));
                this.resetNewPath(); 
                (<any>$('#modal_add_path')).modal('hide')
            })
            .catch(error => {
                this.pathErrorMessage = error.value
                this.pathErrorModel = error;
            });
    }

    updatePath(){
        this.pathErrorMessage = "";
        this.pathErrorModel = new Path();
        this.pathService.update(this.kidId, this.updatingPath)
            .then(id => {
                (<any>$('#modal_edit_path')).modal('hide')
            })
            .catch(error => {
                this.pathErrorMessage = error.value
                this.pathErrorModel = error;
            });
    }

    setUpdatingPath(path: Path): void{
        this.updatingPath = path;
    }

    setDeletingPathId(id: string): void{
        this.deletingPathId = id;
    }

    removePath(){
        if(this.deletingPathId){
            this.pathService.delete(this.kidId, this.deletingPathId)
                .then(() => {
                    this.kid.paths = this.kid.paths.filter(path => path.id !== this.deletingPathId);
                    if(this.kid.paths.length > 0)
                    {
                        this.selectedPath = this.kid.paths[0];
                        this.getGoalsWithSteps(this.selectedPath.id);
                    }
                    else{
                        this.selectedPath = undefined;
                    }
                });
        }
    }

    setPath(pathId: string){
        this.selectedPath = this.kid.paths.find(p => p.id === pathId);
        this.getGoalsWithSteps(this.selectedPath.id);
    }

    addGoal(){
        this.newGoal.completed = false;
        var date = (<any>$('.input-group.date.month-only')).datepicker('getDate');
        this.newGoal.goalMonth = date.getMonth();
        this.newGoal.goalYear = +date.getFullYear();
        this.goalService.create(this.kidId, this.selectedPath.id, this.newGoal)
            .then(id => {
                this.goalService.get(this.kidId, this.selectedPath.id, id)
                    .then(goal => this.kid.paths.find(p => p.id == this.selectedPath.id).goals.push(goal));
                this.resetNewGoal(); 
                (<any>$('#modal_add_goal')).modal('hide')
            })
            .catch(error => {
                this.goalErrorMessage = error.value
                this.goalErrorModel = error;
            });
    }

    updateGoalStatus(goal: Goal, completed: boolean){
        goal.completed = completed;
        this.goalService.update(this.kidId, this.selectedPath.id, goal)
            .then(id => {
                this.kid.paths.find(p => p.id == this.selectedPath.id).goals.find(g => g.id == goal.id).completed = completed;
            });
    }

    setDeletingGoalId(id: string): void{
        this.deletingGoalId = id;
    }

    removeGoal(){
        if(this.deletingGoalId){
            this.goalService.delete(this.kidId, this.selectedPath.id, this.deletingGoalId)
                .then(() => {
                    var goals = this.kid.paths.find(p => p.id == this.selectedPath.id).goals;
                    this.kid.paths.find(p => p.id == this.selectedPath.id).goals = goals.filter(goal => goal.id !== this.deletingGoalId);
                });
        }
    }

    addStep(){
        this.newStep.completed = false;
        this.stepService.create(this.kidId, this.selectedPath.id, this.goalId, this.newStep)
            .then(id => {
                this.stepService.get(this.kidId, this.selectedPath.id, this.goalId, id)
                    .then(step => {
                        this.kid.paths
                            .find(p => p.id == this.selectedPath.id).goals
                            .find(g => g.id == this.goalId).steps.push(step);
                    });
                this.resetNewGoal(); 
                (<any>$('#modal_add_step')).modal('hide')
            })
            .catch(error => {
                this.stepErrorMessage = error.value
                this.stepErrorModel = error;
            });
    }

    updateStepStatus(goalId: string, step: Step, completed: boolean){
        step.completed = completed;
        this.stepService.update(this.kidId, this.selectedPath.id, goalId, step);
    }

    removeStep(goalId: string, id: string){
        if(id){
            this.stepService.delete(this.kidId, this.selectedPath.id, goalId, id)
                .then(() => {
                    var steps = this.kid.paths
                        .find(p => p.id == this.selectedPath.id).goals
                        .find(g => g.id == goalId).steps;
                    this.kid.paths
                        .find(p => p.id == this.selectedPath.id).goals
                        .find(g => g.id == goalId).steps = steps.filter(step => step.id !== id);
                });
        }
    }

    setGoalId(goalId: string){
        this.goalId = goalId;
    }

    private getKidWithPaths(): void {
        this.pathService.getAll(this.kid.id)
            .then(paths => {
                this.kid.paths = paths;
                this.selectedPath = undefined;
                if(this.kid.paths.length > 0)
                {
                    this.selectedPath = this.kid.paths[0];
                    this.getGoalsWithSteps(this.selectedPath.id);
                }                   
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

    private resetNewPath(){
        this.newPath = new Path();
    }

    private resetNewGoal(){
        this.newGoal = new Goal();
    }

    private resetNewStep(){
        this.newStep = new Step();
    }
}