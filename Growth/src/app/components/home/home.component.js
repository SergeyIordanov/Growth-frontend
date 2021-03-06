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
require("rxjs/add/operator/switchMap");
var user_service_1 = require("./../../services/user/user.service");
var kid_service_1 = require("./../../services/kid/kid.service");
var path_service_1 = require("./../../services/path/path.service");
var kid_1 = require("./../../models/kid");
var HomeComponent = (function () {
    function HomeComponent(userService, pathService, kidService) {
        this.userService = userService;
        this.pathService = pathService;
        this.kidService = kidService;
        this.newKid = new kid_1.Kid();
        this.errorModel = new kid_1.Kid();
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.getKidsWithPaths();
        this.resetNewKid();
    };
    HomeComponent.prototype.addKid = function () {
        var _this = this;
        this.kidService.create(this.newKid)
            .then(function (id) {
            _this.kidService.get(id).then(function (kid) { return _this.kids.push(kid); });
            _this.resetNewKid();
            $('#add_modal').modal('hide');
        })
            .catch(function (error) {
            _this.errorMessage = error.value;
            _this.errorModel = error;
        });
    };
    HomeComponent.prototype.setDeletingId = function (id) {
        this.deletingId = id;
    };
    HomeComponent.prototype.removeKid = function () {
        var _this = this;
        if (this.deletingId) {
            this.kidService.delete(this.deletingId)
                .then(function () { return _this.kids = _this.kids.filter(function (kid) { return kid.id !== _this.deletingId; }); });
        }
    };
    HomeComponent.prototype.getBase64 = function () {
        var _this = this;
        var file = $('#new_kid_photo')[0].files[0];
        var reader = new FileReader();
        reader.onload = function () { return _this.newKid.photo = reader.result; };
        reader.readAsDataURL(file);
    };
    HomeComponent.prototype.getKidsWithPaths = function () {
        var _this = this;
        this.kidService.getAll()
            .then(function (kids) {
            _this.kids = kids;
            if (_this.kids) {
                _this.kids.forEach(function (kid) {
                    _this.pathService.getAll(kid.id)
                        .then(function (paths) { return kid.paths = paths; });
                });
            }
        });
    };
    HomeComponent.prototype.resetNewKid = function () {
        this.newKid = new kid_1.Kid();
        this.newKid.gender = "Male";
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'c-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        path_service_1.PathService,
        kid_service_1.KidService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map