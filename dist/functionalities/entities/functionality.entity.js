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
exports.Functionality = void 0;
const typeorm_1 = require("typeorm");
const entity_helper_1 = require("../../utils/entity-helper");
const permission_entity_1 = require("../../permissions/entities/permission.entity");
let Functionality = exports.Functionality = class Functionality extends entity_helper_1.EntityHelper {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Functionality.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, length: 100, nullable: true }),
    __metadata("design:type", String)
], Functionality.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], Functionality.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], Functionality.prototype, "resource", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => permission_entity_1.Permission, (permission) => permission.functionality),
    __metadata("design:type", Array)
], Functionality.prototype, "permissions", void 0);
exports.Functionality = Functionality = __decorate([
    (0, typeorm_1.Entity)()
], Functionality);
//# sourceMappingURL=functionality.entity.js.map