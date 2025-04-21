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
exports.Permission = void 0;
const typeorm_1 = require("typeorm");
const entity_helper_1 = require("../../utils/entity-helper");
const functionality_entity_1 = require("../../functionalities/entities/functionality.entity");
const action_entity_1 = require("../../actions/entities/action.entity");
let Permission = exports.Permission = class Permission extends entity_helper_1.EntityHelper {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Permission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => functionality_entity_1.Functionality, (functionality) => functionality.permissions, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: false
    }),
    (0, typeorm_1.JoinColumn)({ name: 'functionality_id' }),
    __metadata("design:type", functionality_entity_1.Functionality)
], Permission.prototype, "functionality", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number, nullable: false }),
    __metadata("design:type", Number)
], Permission.prototype, "functionality_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => action_entity_1.Action, (action) => action.permissions, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: false
    }),
    (0, typeorm_1.JoinColumn)({ name: 'action_id' }),
    __metadata("design:type", action_entity_1.Action)
], Permission.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number, nullable: false }),
    __metadata("design:type", Number)
], Permission.prototype, "action_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, length: 150, nullable: false, unique: true }),
    __metadata("design:type", String)
], Permission.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], Permission.prototype, "description", void 0);
exports.Permission = Permission = __decorate([
    (0, typeorm_1.Entity)()
], Permission);
//# sourceMappingURL=permission.entity.js.map