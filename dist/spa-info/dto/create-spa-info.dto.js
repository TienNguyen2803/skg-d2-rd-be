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
exports.CreateSpaInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateBannerDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBannerDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/image.jpg' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBannerDto.prototype, "image_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Welcome Banner' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBannerDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Discover our services' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBannerDto.prototype, "subtitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBannerDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateBannerDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: '0 - home, 1 - about, 2 - contact' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBannerDto.prototype, "type", void 0);
class CreateWorkingHourDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateWorkingHourDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Monday' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkingHourDto.prototype, "day_of_week", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '09:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkingHourDto.prototype, "opening_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '18:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkingHourDto.prototype, "closing_time", void 0);
class CreateSpaInfoDto {
}
exports.CreateSpaInfoDto = CreateSpaInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Luxury Spa' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/logo.png' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "logo_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Spa Street' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+1234567890' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'contact@luxuryspa.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Welcome to our luxury spa...' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Luxury Spa - Relaxation & Wellness' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "seo_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Experience ultimate relaxation...' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "seo_description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://facebook.com/luxuryspa' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "facebook_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://instagram.com/luxuryspa' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "instagram_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreateBannerDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateBannerDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateSpaInfoDto.prototype, "banners", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreateWorkingHourDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateWorkingHourDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateSpaInfoDto.prototype, "workingHours", void 0);
//# sourceMappingURL=create-spa-info.dto.js.map