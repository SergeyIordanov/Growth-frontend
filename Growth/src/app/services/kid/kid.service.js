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
var KidService = (function () {
    function KidService(http) {
        this.http = http;
        this.urlPrefix = 'api/users';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    KidService.prototype.getAll = function (userId) {
        var url = this.urlPrefix + "/" + userId;
        return this.http.get(this.urlPrefix)
            .toPromise()
            .then(function (response) {
            var data = response.json().data;
            return data[0].Kids;
        })
            .catch(this.handleError);
    };
    KidService.prototype.get = function (userId, id) {
        var url = this.urlPrefix + "/" + userId;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data[0].Kids.find(function (k) { return k.id === id; }); })
            .catch(this.handleError);
    };
    KidService.prototype.update = function (userId, kid) {
        var url = this.urlPrefix + "/" + userId + "/kids/" + kid.id;
        return this.http
            .put(url, JSON.stringify(kid), { headers: this.headers })
            .toPromise()
            .then(function () { return kid; })
            .catch(this.handleError);
    };
    KidService.prototype.create = function (userId, kid) {
        var url = this.urlPrefix + "/" + userId + "/kids";
        return this.http
            .post(this.urlPrefix, JSON.stringify(kid), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
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
        console.error('An error occurred', error); // TODO for demo purposes only
        return Promise.reject(error.message || error);
    };
    return KidService;
}());
KidService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], KidService);
exports.KidService = KidService;
//# sourceMappingURL=kid.service.js.map