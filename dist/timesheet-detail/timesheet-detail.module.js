"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesheetDetailModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const timesheet_detail_service_1 = require("./timesheet-detail.service");
const timesheet_detail_controller_1 = require("./timesheet-detail.controller");
const timesheet_detail_entity_1 = require("./entities/timesheet-detail.entity");
let TimesheetDetailModule = exports.TimesheetDetailModule = class TimesheetDetailModule {
};
exports.TimesheetDetailModule = TimesheetDetailModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([timesheet_detail_entity_1.TimesheetDetail])],
        controllers: [timesheet_detail_controller_1.TimesheetDetailController],
        providers: [timesheet_detail_service_1.TimesheetDetailService],
        exports: [timesheet_detail_service_1.TimesheetDetailService],
    })
], TimesheetDetailModule);
//# sourceMappingURL=timesheet-detail.module.js.map