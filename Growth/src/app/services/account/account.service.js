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
var http_1 = require("@angular/http");
var core_2 = require("angular2-cookie/core");
require("rxjs/add/operator/toPromise");
var AccountService = (function () {
    function AccountService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.urlPrefix = 'http://growth-app.azurewebsites.net/api';
        this.jsonHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.formHeaders = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    }
    AccountService.prototype.register = function (registerModel) {
        var url = this.urlPrefix + "/register";
        return this.http.post(url, JSON.stringify(registerModel), { headers: this.jsonHeaders })
            .toPromise()
            .then(function (response) { return response.toString(); })
            .catch(this.handleError);
    };
    AccountService.prototype.login = function (loginModel) {
        var url = this.urlPrefix + "/token";
        var requestBody = "username=" + loginModel.Email + "&password=" + loginModel.Password;
        return this.http.post(url, requestBody, { headers: this.formHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AccountService.prototype.logout = function () {
        this.cookieService.remove("growth_token");
    };
    AccountService.prototype.token = function () {
        var token = this.cookieService.getObject("growth_token");
        if (token) {
            return token.Token;
        }
        return undefined;
    };
    AccountService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        var errorObj;
        try {
            errorObj = JSON.parse(error._body);
        }
        catch (ex) {
            errorObj = { 'value': error._body };
        }
        ;
        return Promise.reject(errorObj || error);
    };
    return AccountService;
}());
AccountService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        core_2.CookieService])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map