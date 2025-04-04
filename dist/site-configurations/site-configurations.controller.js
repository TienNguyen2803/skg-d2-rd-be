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
const site_configurations_service_1 = require("./site-configurations.service");
const create_site_configuration_dto_1 = require("./dto/create-site-configuration.dto");
const update_site_configuration_dto_1 = require("./dto/update-site-configuration.dto");
const standard_pagination_1 = require("../utils/standard-pagination");
let SiteConfigurationsController = exports.SiteConfigurationsController = class SiteConfigurationsController {
    constructor(siteConfigurationsService) {
        this.siteConfigurationsService = siteConfigurationsService;
    }
    create(createSiteConfigurationDto) {
        return this.siteConfigurationsService.create(createSiteConfigurationDto);
    }
    async findAll(page, limit, filterQuery, sort) {
        return (0, standard_pagination_1.standardPagination)(await this.siteConfigurationsService.findManyWithPagination({ page, limit, offset: (page - 1) * limit }, filterQuery, sort), await this.siteConfigurationsService.standardCount(filterQuery));
    }
    findOne(id) {
        return this.siteConfigurationsService.findOne(id);
    }
    update(id, updateSiteConfigurationDto) {
        return this.siteConfigurationsService.update(id, updateSiteConfigurationDto);
    }
    remove(id) {
        return this.siteConfigurationsService.softDelete(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create new site configuration' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_site_configuration_dto_1.CreateSiteConfigurationDto]),
    __metadata("design:returntype", void 0)
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
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_site_configuration_dto_1.UpdateSiteConfigurationDto]),
    __metadata("design:returntype", void 0)
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