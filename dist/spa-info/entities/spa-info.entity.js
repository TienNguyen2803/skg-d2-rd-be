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
exports.SpaInfo = void 0;
const typeorm_1 = require("typeorm");
const entity_helper_1 = require("../../utils/entity-helper");
const banner_entity_1 = require("../../banners/entities/banner.entity");
const working_hour_entity_1 = require("../../working-hours/entities/working-hour.entity");
let SpaInfo = exports.SpaInfo = class SpaInfo extends entity_helper_1.EntityHelper {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SpaInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SpaInfo.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SpaInfo.prototype, "logo_url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SpaInfo.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SpaInfo.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SpaInfo.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SpaInfo.prototype, "seo_title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], SpaInfo.prototype, "seo_description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SpaInfo.prototype, "facebook_url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SpaInfo.prototype, "instagram_url", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => banner_entity_1.Banner, (banner) => banner.spa_info, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: false
    }),
    __metadata("design:type", Array)
], SpaInfo.prototype, "banners", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => working_hour_entity_1.WorkingHour, (workingHour) => workingHour.spa_info, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: false
    }),
    __metadata("design:type", Array)
], SpaInfo.prototype, "workingHours", void 0);
exports.SpaInfo = SpaInfo = __decorate([
    (0, typeorm_1.Entity)()
], SpaInfo);
//# sourceMappingURL=spa-info.entity.js.map