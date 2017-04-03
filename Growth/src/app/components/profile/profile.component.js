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
var common_1 = require("@angular/common");
require("rxjs/add/operator/switchMap");
var kid_service_1 = require("./../../services/kid/kid.service");
var path_service_1 = require("./../../services/path/path.service");
var goal_service_1 = require("./../../services/goal/goal.service");
var step_service_1 = require("./../../services/step/step.service");
var kid_1 = require("./../../models/kid");
var ProfileComponent = (function () {
    function ProfileComponent(pathService, goalService, stepService, kidService, route, location) {
        this.pathService = pathService;
        this.goalService = goalService;
        this.stepService = stepService;
        this.kidService = kidService;
        this.route = route;
        this.location = location;
        this.kid = new kid_1.Kid();
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userId = +this.route.snapshot.params['userId'];
        this.route.params
            .switchMap(function (params) { return _this.kidService.get(_this.userId, +params['kidId']); })
            .subscribe(function (kid) {
            _this.kid = kid;
            _this.getKidInfo();
        });
    };
    ProfileComponent.prototype.getKidInfo = function () {
        var _this = this;
        this.pathService.getAll(this.userId, this.kid.id)
            .then(function (paths) {
            _this.kid.Paths = paths;
            if (_this.kid.Paths) {
                _this.kid.Paths.forEach(function (path) {
                    _this.getGoals(_this.kid.id, path.id).then(function (goals) {
                        path.Goals = goals;
                        if (path.Goals) {
                            path.Goals.forEach(function (goal) {
                                _this.getSteps(_this.kid.id, path.id, goal.id).then(function (steps) {
                                    goal.Steps = steps;
                                });
                            });
                        }
                    });
                });
            }
        });
    };
    ProfileComponent.prototype.getPaths = function (kidId) {
        return this.pathService.getAll(this.userId, kidId);
    };
    ProfileComponent.prototype.getGoals = function (kidId, pathId) {
        return this.goalService.getAll(this.userId, kidId, pathId);
    };
    ProfileComponent.prototype.getSteps = function (kidId, pathId, goalId) {
        return this.stepService.getAll(this.userId, kidId, pathId, goalId);
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
        router_1.ActivatedRoute,
        common_1.Location])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map