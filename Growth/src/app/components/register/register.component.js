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
var account_service_1 = require("./../../services/account/account.service");
var registerModel_1 = require("./../../models/registerModel");
var RegisterComponent = (function () {
    function RegisterComponent(accountService, route, router) {
        this.accountService = accountService;
        this.route = route;
        this.router = router;
        this.registerModel = new registerModel_1.RegisterModel();
        this.errorModel = new registerModel_1.RegisterModel();
    }
    RegisterComponent.prototype.ngOnInit = function () {
        if (this.accountService.token()) {
            this.router.navigate(['/me']);
        }
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.accountService.register(this.registerModel)
            .then(function () { return _this.router.navigate(['/login']); })
            .catch(function (error) {
            _this.errorMessage = error.value;
            _this.errorModel = error;
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'c-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    }),
    __metadata("design:paramtypes", [account_service_1.AccountService,
        router_1.ActivatedRoute,
        router_1.Router])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map