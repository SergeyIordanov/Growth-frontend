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
var core_2 = require("angular2-cookie/core");
require("rxjs/add/operator/switchMap");
var account_service_1 = require("./../../services/account/account.service");
var loginModel_1 = require("./../../models/loginModel");
var LoginComponent = (function () {
    function LoginComponent(accountService, cookieService, router) {
        this.accountService = accountService;
        this.cookieService = cookieService;
        this.router = router;
        this.loginModel = new loginModel_1.LoginModel();
        this.errorModel = new loginModel_1.LoginModel();
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.accountService.token()) {
            this.router.navigate(['/me']);
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.accountService.login(this.loginModel)
            .then(function (token) { return _this.router.navigate(['/me']); })
            .catch(function (error) {
            _this.errorMessage = error.value;
            _this.errorModel = error;
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'c-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    __metadata("design:paramtypes", [account_service_1.AccountService,
        core_2.CookieService,
        router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map