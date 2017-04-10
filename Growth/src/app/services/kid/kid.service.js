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
require("rxjs/add/operator/toPromise");
var account_service_1 = require("./../account/account.service");
var KidService = (function () {
    function KidService(http, accountService) {
        this.http = http;
        this.accountService = accountService;
        this.urlPrefix = 'http://growth-app.azurewebsites.net/api/me/kids';
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.accountService.token()
        });
    }
    KidService.prototype.getAll = function () {
        var url = "" + this.urlPrefix;
        return this.http.get(url, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    KidService.prototype.get = function (id) {
        var url = this.urlPrefix + "/" + id;
        return this.http.get(url, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    KidService.prototype.update = function (kid) {
        var url = this.urlPrefix + "/" + kid.Id;
        return this.http
            .put(url, JSON.stringify(kid), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    KidService.prototype.create = function (kid) {
        var url = "" + this.urlPrefix;
        return this.http
            .post(url, JSON.stringify(kid), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    KidService.prototype.delete = function (id) {
        var url = this.urlPrefix + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    KidService.prototype.handleError = function (error) {
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
    return KidService;
}());
KidService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        account_service_1.AccountService])
], KidService);
exports.KidService = KidService;
//# sourceMappingURL=kid.service.js.map