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
exports.Project = void 0;
const typeorm_1 = require("typeorm");
const entity_helper_1 = require("../../utils/entity-helper");
const user_entity_1 = require("../../users/entities/user.entity");
const department_entity_1 = require("../../departments/entities/department.entity");
const timesheet_entity_1 = require("../../timesheet/entities/timesheet.entity");
const project_type_entity_1 = require("../../project-types/entities/project-type.entity");
let Project = exports.Project = class Project extends entity_helper_1.EntityHelper {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_type_entity_1.ProjectType, {
        eager: false
    }),
    (0, typeorm_1.JoinColumn)({ name: 'project_type_id' }),
    __metadata("design:type", project_type_entity_1.ProjectType)
], Project.prototype, "project_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number, nullable: true }),
    __metadata("design:type", Number)
], Project.prototype, "project_type_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Project.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, (department) => department.projects, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: false
    }),
    (0, typeorm_1.JoinColumn)({ name: 'department_id' }),
    __metadata("design:type", department_entity_1.Department)
], Project.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number, nullable: true }),
    __metadata("design:type", Number)
], Project.prototype, "department_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.managed_projects, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: false
    }),
    (0, typeorm_1.JoinColumn)({ name: 'pm_user_id' }),
    __metadata("design:type", user_entity_1.User)
], Project.prototype, "project_manager", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number, nullable: true }),
    __metadata("design:type", Number)
], Project.prototype, "pm_user_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => timesheet_entity_1.Timesheet, (t) => t.project),
    __metadata("design:type", Array)
], Project.prototype, "timesheets", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)()
], Project);
//# sourceMappingURL=project.entity.js.map