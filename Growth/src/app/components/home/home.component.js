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
var HomeComponent = (function () {
    function HomeComponent(pathService, kidService, route, location) {
        this.pathService = pathService;
        this.kidService = kidService;
        this.route = route;
        this.location = location;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.userId = +this.route.snapshot.params['userId'];
        this.getKidsWithPaths();
    };
    HomeComponent.prototype.getKidsWithPaths = function () {
        var _this = this;
        this.kidService.getAll(this.userId)
            .then(function (kids) {
            _this.kids = kids;
            _this.kids.forEach(function (kid) {
                _this.pathService.getAll(_this.userId, kid.id)
                    .then(function (paths) { return kid.Paths = paths; });
            });
        });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'c-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    }),
    __metadata("design:paramtypes", [path_service_1.PathService,
        kid_service_1.KidService,
        router_1.ActivatedRoute,
        common_1.Location])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map