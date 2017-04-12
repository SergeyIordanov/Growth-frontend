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
var ProfileComponent = (function () {
    function ProfileComponent(pathService, goalService, stepService, kidService, route) {
        this.pathService = pathService;
        this.goalService = goalService;
        this.stepService = stepService;
        this.kidService = kidService;
        this.route = route;
        this.kid = new kid_1.Kid();
        this.selectedPath = new path_1.Path();
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.kidService.get(params['kidId']); })
            .subscribe(function (kid) {
            _this.kid = kid;
            _this.getKidWithPaths();
            if (_this.kid.paths.length > 0) {
                _this.selectedPath = _this.kid.paths[0];
                _this.getGoalsWithSteps(_this.selectedPath.id);
            }
        });
        $('.input-group.date.month-only').datepicker({
            format: "mm/yyyy",
            startView: 1,
            minViewMode: 1
        });
    };
    ProfileComponent.prototype.setPath = function (pathId) {
        this.selectedPath = this.kid.paths.find(function (p) { return p.id === pathId; });
        this.getGoalsWithSteps(this.selectedPath.id);
    };
    ProfileComponent.prototype.getKidWithPaths = function () {
        var _this = this;
        this.pathService.getAll(this.kid.id)
            .then(function (paths) {
            _this.kid.paths = paths;
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