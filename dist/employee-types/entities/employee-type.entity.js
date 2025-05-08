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
exports.EmployeeType = void 0;
const typeorm_1 = require("typeorm");
const entity_helper_1 = require("../../utils/entity-helper");
const user_entity_1 = require("../../users/entities/user.entity");
let EmployeeType = exports.EmployeeType = class EmployeeType extends entity_helper_1.EntityHelper {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmployeeType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, unique: true }),
    __metadata("design:type", String)
], EmployeeType.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String }),
    __metadata("design:type", String)
], EmployeeType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision', nullable: true }),
    __metadata("design:type", Number)
], EmployeeType.prototype, "resource_effort", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.employee_type),
    __metadata("design:type", Array)
], EmployeeType.prototype, "users", void 0);
exports.EmployeeType = EmployeeType = __decorate([
    (0, typeorm_1.Entity)()
], EmployeeType);
//# sourceMappingURL=employee-type.entity.js.map