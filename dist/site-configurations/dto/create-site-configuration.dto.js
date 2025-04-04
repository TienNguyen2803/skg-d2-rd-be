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
exports.CreateSiteConfigurationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSiteConfigurationDto {
}
exports.CreateSiteConfigurationDto = CreateSiteConfigurationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'My Website' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSiteConfigurationDto.prototype, "website_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Best website ever' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSiteConfigurationDto.prototype, "slogan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/path/to/logo.png' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSiteConfigurationDto.prototype, "logo_path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/path/to/favicon.ico' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSiteConfigurationDto.prototype, "favicon_path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'contact@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSiteConfigurationDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+1234567890' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSiteConfigurationDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Main St' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSiteConfigurationDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://facebook.com/mypage' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSiteConfigurationDto.prototype, "facebook_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://instagram.com/mypage' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSiteConfigurationDto.prototype, "instagram_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '© 2025 My Company' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSiteConfigurationDto.prototype, "copyright_text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/path/to/footer-logo.png' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSiteConfigurationDto.prototype, "footer_logo_path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateSiteConfigurationDto.prototype, "is_active", void 0);
//# sourceMappingURL=create-site-configuration.dto.js.map