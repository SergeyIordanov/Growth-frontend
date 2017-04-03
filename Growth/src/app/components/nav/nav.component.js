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
var NavComponent = (function () {
    function NavComponent(kidService, route, router, location) {
        this.kidService = kidService;
        this.route = route;
        this.router = router;
        this.location = location;
    }
    NavComponent.prototype.ngOnInit = function () {
        this.userId = +this.route.snapshot.params['userId'];
        this.getKids();
    };
    NavComponent.prototype.getKids = function () {
        var _this = this;
        this.kidService.getAll(this.userId).then(function (kids) { return _this.kids = kids; });
    };
    return NavComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], NavComponent.prototype, "selectedKidId", void 0);
NavComponent = __decorate([
    core_1.Component({
        selector: 'c-nav',
        templateUrl: './nav.component.html',
        styleUrls: ['./nav.component.css']
    }),
    __metadata("design:paramtypes", [kid_service_1.KidService,
        router_1.ActivatedRoute,
        router_1.Router,
        common_1.Location])
], NavComponent);
exports.NavComponent = NavComponent;
//# sourceMappingURL=nav.component.js.map