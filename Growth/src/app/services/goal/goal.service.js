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
var GoalService = (function () {
    function GoalService(http, accountService) {
        this.http = http;
        this.accountService = accountService;
        //private urlPrefix = 'http://growth-app.azurewebsites.net/api/me/kids';
        this.urlPrefix = 'http://localhost:5000/api/me/kids';
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.accountService.token()
        });
    }
    GoalService.prototype.getAll = function (kidId, pathId) {
        var url = this.urlPrefix + "/" + kidId + "/paths/" + pathId + "/goals";
        return this.http.get(url, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    GoalService.prototype.get = function (kidId, pathId, id) {
        var url = this.urlPrefix + "/" + kidId + "/paths/" + pathId + "/goals/" + id;
        return this.http.get(url, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    GoalService.prototype.update = function (kidId, pathId, goal) {
        var url = this.urlPrefix + "/" + kidId + "/paths/" + pathId + "/goals";
        return this.http
            .put(url, JSON.stringify(goal), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    GoalService.prototype.create = function (kidId, pathId, goal) {
        var url = this.urlPrefix + "/" + kidId + "/paths/" + pathId + "/goals";
        return this.http
            .post(url, JSON.stringify(goal), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    GoalService.prototype.delete = function (kidId, pathId, id) {
        var url = this.urlPrefix + "/" + kidId + "/paths/" + pathId + "/goals/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    GoalService.prototype.handleError = function (error) {
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
    return GoalService;
}());
GoalService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        account_service_1.AccountService])
], GoalService);
exports.GoalService = GoalService;
//# sourceMappingURL=goal.service.js.map