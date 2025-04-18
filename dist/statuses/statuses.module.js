"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const statuses_service_1 = require("./statuses.service");
const statuses_controller_1 = require("./statuses.controller");
const status_entity_1 = require("./entities/status.entity");
let StatusesModule = exports.StatusesModule = class StatusesModule {
};
exports.StatusesModule = StatusesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([status_entity_1.Status])],
        controllers: [statuses_controller_1.StatusesController],
        providers: [statuses_service_1.StatusesService],
        exports: [statuses_service_1.StatusesService],
    })
], StatusesModule);
//# sourceMappingURL=statuses.module.js.map