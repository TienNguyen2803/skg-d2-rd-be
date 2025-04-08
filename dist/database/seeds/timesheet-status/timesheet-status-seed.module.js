"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesheetStatusSeedModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const timesheet_status_entity_1 = require("../../../timesheet-status/entities/timesheet-status.entity");
const timesheet_status_seed_service_1 = require("./timesheet-status-seed.service");
let TimesheetStatusSeedModule = exports.TimesheetStatusSeedModule = class TimesheetStatusSeedModule {
};
exports.TimesheetStatusSeedModule = TimesheetStatusSeedModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([timesheet_status_entity_1.TimesheetStatus])],
        providers: [timesheet_status_seed_service_1.TimesheetStatusSeedService],
        exports: [timesheet_status_seed_service_1.TimesheetStatusSeedService],
    })
], TimesheetStatusSeedModule);
//# sourceMappingURL=timesheet-status-seed.module.js.map