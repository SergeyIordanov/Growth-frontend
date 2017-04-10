"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_routing_module_1 = require("./app-routing.module");
// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './../services/in-memory-data.service';
var app_component_1 = require("./../components/app/app.component");
var home_component_1 = require("./../components/home/home.component");
var header_component_1 = require("./../components/header/header.component");
var nav_component_1 = require("./../components/nav/nav.component");
var profile_component_1 = require("./../components/profile/profile.component");
var login_component_1 = require("./../components/login/login.component");
var register_component_1 = require("./../components/register/register.component");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var account_service_1 = require("./../services/account/account.service");
var user_service_1 = require("./../services/user/user.service");
var kid_service_1 = require("./../services/kid/kid.service");
var path_service_1 = require("./../services/path/path.service");
var goal_service_1 = require("./../services/goal/goal.service");
var step_service_1 = require("./../services/step/step.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            // InMemoryWebApiModule.forRoot(InMemoryDataService),
            app_routing_module_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent,
            header_component_1.HeaderComponent,
            nav_component_1.NavComponent,
            profile_component_1.ProfileComponent,
            login_component_1.LoginComponent,
            register_component_1.RegisterComponent
        ],
        providers: [
            cookies_service_1.CookieService,
            account_service_1.AccountService,
            user_service_1.UserService,
            kid_service_1.KidService,
            path_service_1.PathService,
            goal_service_1.GoalService,
            step_service_1.StepService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map