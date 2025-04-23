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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const is_not_exists_validator_1 = require("../../utils/validators/is-not-exists.validator");
const status_entity_1 = require("../../statuses/entities/status.entity");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test1@example.com' }),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.toLowerCase().trim()),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Validate)(is_not_exists_validator_1.IsNotExist, ['User'], {
        message: 'emailAlreadyExists',
    }),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", status_entity_1.Status)
], CreateUserDto.prototype, "status_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "department_id", void 0);
//# sourceMappingURL=create-user.dto.js.map