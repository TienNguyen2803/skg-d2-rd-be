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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteConfigurationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const path_1 = require("path");
const site_configurations_service_1 = require("./site-configurations.service");
const create_site_configuration_dto_1 = require("./dto/create-site-configuration.dto");
const update_site_configuration_dto_1 = require("./dto/update-site-configuration.dto");
const standard_pagination_1 = require("../utils/standard-pagination");
let SiteConfigurationsController = exports.SiteConfigurationsController = class SiteConfigurationsController {
    constructor(siteConfigurationsService) {
        this.siteConfigurationsService = siteConfigurationsService;
    }
    async create(createSiteConfigurationDto, files) {
        var _a, _b, _c, _d, _e, _f;
        const dto = Object.assign(Object.assign({}, createSiteConfigurationDto), { logo_path: (_b = (_a = files.logo) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.filename, favicon_path: (_d = (_c = files.favicon) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.filename, footer_logo_path: (_f = (_e = files.footer_logo) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.filename });
        return this.siteConfigurationsService.create(dto);
    }
    async findAll(page, limit, filterQuery, sort) {
        return (0, standard_pagination_1.standardPagination)(await this.siteConfigurationsService.findManyWithPagination({ page, limit, offset: (page - 1) * limit }, filterQuery, sort), await this.siteConfigurationsService.standardCount(filterQuery));
    }
    findOne(id) {
        return this.siteConfigurationsService.findOne(id);
    }
    async update(id, updateSiteConfigurationDto, files) {
        var _a, _b, _c, _d, _e, _f;
        const dto = Object.assign(Object.assign({}, updateSiteConfigurationDto), { logo_path: (_b = (_a = files.logo) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.filename, favicon_path: (_d = (_c = files.favicon) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.filename, footer_logo_path: (_f = (_e = files.footer_logo) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.filename });
        return this.siteConfigurationsService.update(id, dto);
    }
    remove(id) {
        return this.siteConfigurationsService.softDelete(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create new site configuration' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'logo', maxCount: 1 },
        { name: 'favicon', maxCount: 1 },
        { name: 'footer_logo', maxCount: 1 },
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, callback) => {
                const fileExtName = (0, path_1.extname)(file.originalname);
                callback(null, `${(0, random_string_generator_util_1.randomStringGenerator)()}${fileExtName}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|ico)$/i)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_site_configuration_dto_1.CreateSiteConfigurationDto, Object]),
    __metadata("design:returntype", Promise)
], SiteConfigurationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get site configurations list' }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('s')),
    __param(3, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], SiteConfigurationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get site configuration by id' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SiteConfigurationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update site configuration' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'logo', maxCount: 1 },
        { name: 'favicon', maxCount: 1 },
        { name: 'footer_logo', maxCount: 1 },
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, callback) => {
                const fileExtName = (0, path_1.extname)(file.originalname);
                callback(null, `${(0, random_string_generator_util_1.randomStringGenerator)()}${fileExtName}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|ico)$/i)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_site_configuration_dto_1.UpdateSiteConfigurationDto, Object]),
    __metadata("design:returntype", Promise)
], SiteConfigurationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete site configuration' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SiteConfigurationsController.prototype, "remove", null);
exports.SiteConfigurationsController = SiteConfigurationsController = __decorate([
    (0, swagger_1.ApiTags)('Site Configurations'),
    (0, common_1.Controller)({
        path: 'site-configurations',
        version: '1',
    }),
    __metadata("design:paramtypes", [site_configurations_service_1.SiteConfigurationsService])
], SiteConfigurationsController);
//# sourceMappingURL=site-configurations.controller.js.map