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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const entity_helper_1 = require("../../utils/entity-helper");
const app_config_1 = __importDefault(require("../../config/app.config"));
let FileEntity = exports.FileEntity = class FileEntity extends entity_helper_1.EntityHelper {
    updatePath() {
        if (this.path.indexOf('/') === 0) {
            this.path = (0, app_config_1.default)().backendDomain + this.path;
        }
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FileEntity.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FileEntity.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    (0, typeorm_1.AfterInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FileEntity.prototype, "updatePath", null);
exports.FileEntity = FileEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'file' })
], FileEntity);
//# sourceMappingURL=file.entity.js.map