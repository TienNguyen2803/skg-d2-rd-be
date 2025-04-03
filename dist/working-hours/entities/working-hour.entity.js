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
exports.WorkingHour = void 0;
const typeorm_1 = require("typeorm");
const entity_helper_1 = require("../../utils/entity-helper");
const spa_info_entity_1 = require("../../spa-info/entities/spa-info.entity");
let WorkingHour = exports.WorkingHour = class WorkingHour extends entity_helper_1.EntityHelper {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WorkingHour.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkingHour.prototype, "day_of_week", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkingHour.prototype, "opening_time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkingHour.prototype, "closing_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], WorkingHour.prototype, "is_closed", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => spa_info_entity_1.SpaInfo, (spaInfo) => spaInfo.workingHours, {
        onDelete: 'CASCADE',
        nullable: false,
        onUpdate: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'spa_info_id' }),
    __metadata("design:type", spa_info_entity_1.SpaInfo)
], WorkingHour.prototype, "spa_info", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WorkingHour.prototype, "spa_info_id", void 0);
exports.WorkingHour = WorkingHour = __decorate([
    (0, typeorm_1.Entity)()
], WorkingHour);
//# sourceMappingURL=working-hour.entity.js.map