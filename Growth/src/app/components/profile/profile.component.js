"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
require("rxjs/add/operator/switchMap");
var kid_service_1 = require("./../../services/kid/kid.service");
var path_service_1 = require("./../../services/path/path.service");
var goal_service_1 = require("./../../services/goal/goal.service");
var step_service_1 = require("./../../services/step/step.service");
var kid_1 = require("./../../models/kid");
var path_1 = require("./../../models/path");
var goal_1 = require("./../../models/goal");
var step_1 = require("./../../models/step");
var ProfileComponent = (function () {
    function ProfileComponent(pathService, goalService, stepService, kidService, route) {
        this.pathService = pathService;
        this.goalService = goalService;
        this.stepService = stepService;
        this.kidService = kidService;
        this.route = route;
        this.kid = new kid_1.Kid();
        this.newPath = new path_1.Path();
        this.updatingPath = new path_1.Path();
        this.pathErrorModel = new path_1.Path();
        this.newGoal = new goal_1.Goal();
        this.goalErrorModel = new goal_1.Goal();
        this.newStep = new step_1.Step();
        this.stepErrorModel = new step_1.Step();
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.kidId = params['kidId'];
            _this.kidService.get(_this.kidId)
                .then(function (kid) {
                _this.kid = kid;
                _this.getKidWithPaths();
            });
        });
        $('.input-group.date.month-only').datepicker({
            format: "mm/yyyy",
            startView: 1,
            minViewMode: 1
        });
    };
    ProfileComponent.prototype.addPath = function () {
        var _this = this;
        this.pathService.create(this.kidId, this.newPath)
            .then(function (id) {
            _this.pathService.get(_this.kidId, id).then(function (path) { return _this.kid.paths.push(path); });
            _this.resetNewPath();
            $('#modal_add_path').modal('hide');
        })
            .catch(function (error) {
            _this.pathErrorMessage = error.value;
            _this.pathErrorModel = error;
        });
    };
    ProfileComponent.prototype.updatePath = function () {
        var _this = this;
        this.pathErrorMessage = "";
        this.pathErrorModel = new path_1.Path();
        this.pathService.update(this.kidId, this.updatingPath)
            .then(function (id) {
            $('#modal_edit_path').modal('hide');
        })
            .catch(function (error) {
            _this.pathErrorMessage = error.value;
            _this.pathErrorModel = error;
        });
    };
    ProfileComponent.prototype.setUpdatingPath = function (path) {
        this.updatingPath = path;
    };
    ProfileComponent.prototype.setDeletingPathId = function (id) {
        this.deletingPathId = id;
    };
    ProfileComponent.prototype.removePath = function () {
        var _this = this;
        if (this.deletingPathId) {
            this.pathService.delete(this.kidId, this.deletingPathId)
                .then(function () {
                _this.kid.paths = _this.kid.paths.filter(function (path) { return path.id !== _this.deletingPathId; });
                if (_this.kid.paths.length > 0) {
                    _this.selectedPath = _this.kid.paths[0];
                    _this.getGoalsWithSteps(_this.selectedPath.id);
                }
                else {
                    _this.selectedPath = undefined;
                }
            });
        }
    };
    ProfileComponent.prototype.setPath = function (pathId) {
        this.selectedPath = this.kid.paths.find(function (p) { return p.id === pathId; });
        this.getGoalsWithSteps(this.selectedPath.id);
    };
    ProfileComponent.prototype.addGoal = function () {
        var _this = this;
        this.newGoal.completed = false;
        var date = $('.input-group.date.month-only').datepicker('getDate');
        this.newGoal.goalMonth = date.getMonth();
        this.newGoal.goalYear = +date.getFullYear();
        this.goalService.create(this.kidId, this.selectedPath.id, this.newGoal)
            .then(function (id) {
            _this.goalService.get(_this.kidId, _this.selectedPath.id, id)
                .then(function (goal) { return _this.kid.paths.find(function (p) { return p.id == _this.selectedPath.id; }).goals.push(goal); });
            _this.resetNewGoal();
            $('#modal_add_goal').modal('hide');
        })
            .catch(function (error) {
            _this.goalErrorMessage = error.value;
            _this.goalErrorModel = error;
        });
    };
    ProfileComponent.prototype.updateGoalStatus = function (goal, completed) {
        var _this = this;
        goal.completed = completed;
        this.goalService.update(this.kidId, this.selectedPath.id, goal)
            .then(function (id) {
            _this.kid.paths.find(function (p) { return p.id == _this.selectedPath.id; }).goals.find(function (g) { return g.id == goal.id; }).completed = completed;
        });
    };
    ProfileComponent.prototype.setDeletingGoalId = function (id) {
        this.deletingGoalId = id;
    };
    ProfileComponent.prototype.removeGoal = function () {
        var _this = this;
        if (this.deletingGoalId) {
            this.goalService.delete(this.kidId, this.selectedPath.id, this.deletingGoalId)
                .then(function () {
                var goals = _this.kid.paths.find(function (p) { return p.id == _this.selectedPath.id; }).goals;
                _this.kid.paths.find(function (p) { return p.id == _this.selectedPath.id; }).goals = goals.filter(function (goal) { return goal.id !== _this.deletingGoalId; });
            });
        }
    };
    ProfileComponent.prototype.addStep = function () {
        var _this = this;
        this.newStep.completed = false;
        this.stepService.create(this.kidId, this.selectedPath.id, this.goalId, this.newStep)
            .then(function (id) {
            _this.getGoalsWithSteps(_this.selectedPath.id);
            _this.resetNewStep();
            $('#modal_add_step').modal('hide');
        })
            .catch(function (error) {
            _this.stepErrorMessage = error.value;
            _this.stepErrorModel = error;
        });
    };
    ProfileComponent.prototype.updateStepStatus = function (goalId, step, completed) {
        step.completed = completed;
        this.stepService.update(this.kidId, this.selectedPath.id, goalId, step);
    };
    ProfileComponent.prototype.removeStep = function (goalId, id) {
        var _this = this;
        if (id) {
            this.stepService.delete(this.kidId, this.selectedPath.id, goalId, id)
                .then(function () { return _this.getGoalsWithSteps(_this.selectedPath.id); });
        }
    };
    ProfileComponent.prototype.setGoalId = function (goalId) {
        this.goalId = goalId;
    };
    ProfileComponent.prototype.getKidWithPaths = function () {
        var _this = this;
        this.pathService.getAll(this.kid.id)
            .then(function (paths) {
            _this.kid.paths = paths;
            _this.selectedPath = undefined;
            if (_this.kid.paths.length > 0) {
                _this.selectedPath = _this.kid.paths[0];
                _this.getGoalsWithSteps(_this.selectedPath.id);
            }
        });
    };
    ProfileComponent.prototype.getGoalsWithSteps = function (pathId) {
        var _this = this;
        this.goalService.getAll(this.kid.id, pathId).then(function (goals) {
            _this.selectedPath.goals = goals;
            if (_this.selectedPath.goals) {
                _this.selectedPath.goals.forEach(function (goal) {
                    _this.stepService.getAll(_this.kid.id, _this.selectedPath.id, goal.id).then(function (steps) {
                        goal.steps = steps;
                    });
                });
            }
        });
    };
    ProfileComponent.prototype.resetNewPath = function () {
        this.newPath = new path_1.Path();
    };
    ProfileComponent.prototype.resetNewGoal = function () {
        this.newGoal = new goal_1.Goal();
    };
    ProfileComponent.prototype.resetNewStep = function () {
        this.newStep = new step_1.Step();
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'c-home',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.css']
    }),
    __metadata("design:paramtypes", [path_service_1.PathService,
        goal_service_1.GoalService,
        step_service_1.StepService,
        kid_service_1.KidService,
        router_1.ActivatedRoute])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map