"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaInfoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const spa_info_service_1 = require("./spa-info.service");
const spa_info_controller_1 = require("./spa-info.controller");
const spa_info_entity_1 = require("./entities/spa-info.entity");
const banner_entity_1 = require("../banners/entities/banner.entity");
const working_hour_entity_1 = require("../working-hours/entities/working-hour.entity");
let SpaInfoModule = exports.SpaInfoModule = class SpaInfoModule {
};
exports.SpaInfoModule = SpaInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([spa_info_entity_1.SpaInfo, banner_entity_1.Banner, working_hour_entity_1.WorkingHour])],
        controllers: [spa_info_controller_1.SpaInfoController],
        providers: [spa_info_service_1.SpaInfoService],
        exports: [spa_info_service_1.SpaInfoService],
    })
], SpaInfoModule);
//# sourceMappingURL=spa-info.module.js.map