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
exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const status_entity_1 = require("../../statuses/entities/status.entity");
const create_user_dto_1 = require("./create-user.dto");
const class_transformer_1 = require("class-transformer");
const department_entity_1 = require("../../departments/entities/department.entity");
class UpdateUserDto extends (0, swagger_1.PartialType)(create_user_dto_1.CreateUserDto) {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test1@example.com' }),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.toLowerCase().trim()),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", Object)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2], required: false, description: 'Array of role IDs' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateUserDto.prototype, "roleIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => status_entity_1.Status }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", status_entity_1.Status)
], UpdateUserDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "department_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => department_entity_1.Department }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", department_entity_1.Department)
], UpdateUserDto.prototype, "department", void 0);
//# sourceMappingURL=update-user.dto.js.map