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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesheetDetail = void 0;
const typeorm_1 = require("typeorm");
const entity_helper_1 = require("../../utils/entity-helper");
const timesheet_entity_1 = require("../../timesheet/entities/timesheet.entity");
let TimesheetDetail = exports.TimesheetDetail = class TimesheetDetail extends entity_helper_1.EntityHelper {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TimesheetDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Date, nullable: true }),
    __metadata("design:type", Date)
], TimesheetDetail.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], TimesheetDetail.prototype, "start_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], TimesheetDetail.prototype, "end_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number, nullable: true }),
    __metadata("design:type", Number)
], TimesheetDetail.prototype, "ot_hours", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], TimesheetDetail.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => timesheet_entity_1.Timesheet, (timesheet) => timesheet.details, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: false
    }),
    (0, typeorm_1.JoinColumn)({ name: 'timesheet_id' }),
    __metadata("design:type", timesheet_entity_1.Timesheet)
], TimesheetDetail.prototype, "timesheet", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number, nullable: true }),
    __metadata("design:type", Number)
], TimesheetDetail.prototype, "timesheet_id", void 0);
exports.TimesheetDetail = TimesheetDetail = __decorate([
    (0, typeorm_1.Entity)()
], TimesheetDetail);
//# sourceMappingURL=timesheet-detail.entity.js.map