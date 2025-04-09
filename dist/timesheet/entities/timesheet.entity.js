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
exports.Timesheet = void 0;
const typeorm_1 = require("typeorm");
const entity_helper_1 = require("../../utils/entity-helper");
const project_entity_1 = require("../../projects/entities/project.entity");
const department_entity_1 = require("../../departments/entities/department.entity");
const timesheet_status_entity_1 = require("../../timesheet-status/entities/timesheet-status.entity");
const timesheet_detail_entity_1 = require("../../timesheet-detail/entities/timesheet-detail.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Timesheet = exports.Timesheet = class Timesheet extends entity_helper_1.EntityHelper {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.timesheets, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: false
    }),
    (0, typeorm_1.JoinColumn)({ name: 'creator_id' }),
    __metadata("design:type", user_entity_1.User)
], Timesheet.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number, nullable: true }),
    __metadata("design:type", Number)
], Timesheet.prototype, "creator_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Timesheet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], Timesheet.prototype, "month_year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision', nullable: true }),
    __metadata("design:type", Number)
], Timesheet.prototype, "total_hours", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], Timesheet.prototype, "reject_reason", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.timesheets, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: false
    }),
    (0, typeorm_1.JoinColumn)({ name: 'project_id' }),
    __metadata("design:type", project_entity_1.Project)
], Timesheet.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number, nullable: true }),
    __metadata("design:type", Number)
], Timesheet.prototype, "project_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, (department) => department.timesheets, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: false
    }),
    (0, typeorm_1.JoinColumn)({ name: 'department_id' }),
    __metadata("design:type", department_entity_1.Department)
], Timesheet.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number, nullable: true }),
    __metadata("design:type", Number)
], Timesheet.prototype, "department_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => timesheet_status_entity_1.TimesheetStatus, (status) => status.timesheets, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: false
    }),
    (0, typeorm_1.JoinColumn)({ name: 'status_id' }),
    __metadata("design:type", timesheet_status_entity_1.TimesheetStatus)
], Timesheet.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number, nullable: true }),
    __metadata("design:type", Number)
], Timesheet.prototype, "status_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => timesheet_detail_entity_1.TimesheetDetail, (detail) => detail.timesheet),
    __metadata("design:type", Array)
], Timesheet.prototype, "details", void 0);
exports.Timesheet = Timesheet = __decorate([
    (0, typeorm_1.Entity)()
], Timesheet);
//# sourceMappingURL=timesheet.entity.js.map