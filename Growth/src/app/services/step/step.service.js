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
var StepService = (function () {
    function StepService(http, accountService) {
        this.http = http;
        this.accountService = accountService;
        //private urlPrefix = 'http://growth-app.azurewebsites.net/api/me/kids';
        this.urlPrefix = 'http://localhost:5000/api/me/kids';
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.accountService.token()
        });
    }
    StepService.prototype.getAll = function (kidId, pathId, goalId) {
        var url = this.urlPrefix + "/" + kidId + "/paths/" + pathId + "/goals/" + goalId + "/steps";
        return this.http.get(url, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    StepService.prototype.get = function (kidId, pathId, goalId, id) {
        var url = this.urlPrefix + "/" + kidId + "/paths/" + pathId + "/goals/" + goalId + "/steps/" + id;
        return this.http.get(url, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    StepService.prototype.update = function (kidId, pathId, goalId, step) {
        var url = this.urlPrefix + "/" + kidId + "/paths/" + pathId + "/goals/" + goalId + "/steps";
        return this.http
            .put(url, JSON.stringify(step), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    StepService.prototype.create = function (kidId, pathId, goalId, step) {
        var url = this.urlPrefix + "/" + kidId + "/paths/" + pathId + "/goals/" + goalId + "/steps";
        return this.http
            .post(url, JSON.stringify(step), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    StepService.prototype.delete = function (kidId, pathId, goalId, id) {
        var url = this.urlPrefix + "/" + kidId + "/paths/" + pathId + "/goals/" + goalId + "/steps/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    StepService.prototype.handleError = function (error) {
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
    return StepService;
}());
StepService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        account_service_1.AccountService])
], StepService);
exports.StepService = StepService;
//# sourceMappingURL=step.service.js.map