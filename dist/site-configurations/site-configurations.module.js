"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteConfigurationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const site_configurations_service_1 = require("./site-configurations.service");
const site_configurations_controller_1 = require("./site-configurations.controller");
const site_configuration_entity_1 = require("./entities/site-configuration.entity");
let SiteConfigurationsModule = exports.SiteConfigurationsModule = class SiteConfigurationsModule {
};
exports.SiteConfigurationsModule = SiteConfigurationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([site_configuration_entity_1.SiteConfiguration])],
        controllers: [site_configurations_controller_1.SiteConfigurationsController],
        providers: [site_configurations_service_1.SiteConfigurationsService],
    })
], SiteConfigurationsModule);
//# sourceMappingURL=site-configurations.module.js.map