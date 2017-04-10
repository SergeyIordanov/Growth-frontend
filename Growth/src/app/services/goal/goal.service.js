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
var GoalService = (function () {
    function GoalService(http) {
        this.http = http;
        this.urlPrefix = 'api/users';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    GoalService.prototype.getAll = function (userId, kidId, pathId) {
        var url = this.urlPrefix + "/" + userId;
        return this.http.get(this.urlPrefix)
            .toPromise()
            .then(function (response) {
            var data = response.json().data;
            var kids = data[0].Kids;
            var paths = data[0].Kids[kids.findIndex(function (k) { return k.id == kidId; })].Paths;
            return data[0].Kids[kids.findIndex(function (k) { return k.id == kidId; })].Paths[paths.findIndex(function (p) { return p.id == pathId; })].Goals;
        })
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
    __metadata("design:paramtypes", [http_1.Http])
], GoalService);
exports.GoalService = GoalService;
//# sourceMappingURL=goal.service.js.map