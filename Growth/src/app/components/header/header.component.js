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
var account_service_1 = require("./../../services/account/account.service");
var user_service_1 = require("./../../services/user/user.service");
var user_1 = require("./../../models/user");
var HeaderComponent = (function () {
    function HeaderComponent(accountService, userService, router, location) {
        this.accountService = accountService;
        this.userService = userService;
        this.router = router;
        this.location = location;
        this.user = new user_1.User();
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getCurrentUser()
            .then(function (user) {
            _this.user = user;
            if (!_this.title) {
                _this.title = "Hello, " + user.name;
            }
        });
    };
    HeaderComponent.prototype.logout = function () {
        this.accountService.logout();
        this.router.navigate(['/login']);
    };
    return HeaderComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], HeaderComponent.prototype, "title", void 0);
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'c-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.css']
    }),
    __metadata("design:paramtypes", [account_service_1.AccountService,
        user_service_1.UserService,
        router_1.Router,
        common_1.Location])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map