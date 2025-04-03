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
exports.ServiceCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const service_categories_service_1 = require("./service-categories.service");
const create_service_category_dto_1 = require("./dto/create-service-category.dto");
const update_service_category_dto_1 = require("./dto/update-service-category.dto");
const service_category_entity_1 = require("./entities/service-category.entity");
const standard_pagination_1 = require("../utils/standard-pagination");
let ServiceCategoriesController = exports.ServiceCategoriesController = class ServiceCategoriesController {
    constructor(serviceCategoriesService) {
        this.serviceCategoriesService = serviceCategoriesService;
    }
    create(createServiceCategoryDto) {
        return this.serviceCategoriesService.create(createServiceCategoryDto);
    }
    async findAll(page, limit, filterQuery, sort) {
        return (0, standard_pagination_1.standardPagination)(await this.serviceCategoriesService.findManyWithPagination({
            page,
            limit,
            offset: (page - 1) * limit,
        }, filterQuery, sort), await this.serviceCategoriesService.standardCount(filterQuery));
    }
    findOne(id) {
        return this.serviceCategoriesService.findOne(id);
    }
    update(id, updateServiceCategoryDto) {
        return this.serviceCategoriesService.update(id, updateServiceCategoryDto);
    }
    async remove(id) {
        await this.serviceCategoriesService.softDelete(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create new service category' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Service category has been successfully created.',
        type: service_category_entity_1.ServiceCategory,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_category_dto_1.CreateServiceCategoryDto]),
    __metadata("design:returntype", Promise)
], ServiceCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get service categories list' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Get service categories list',
        type: [service_category_entity_1.ServiceCategory],
    }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('s')),
    __param(3, (0, common_1.Query)('sort.0')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], ServiceCategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get service category by id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Get service category by id',
        type: service_category_entity_1.ServiceCategory,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ServiceCategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update service category' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Service category has been successfully updated',
        type: service_category_entity_1.ServiceCategory,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_service_category_dto_1.UpdateServiceCategoryDto]),
    __metadata("design:returntype", Promise)
], ServiceCategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete service category' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'Service category has been successfully deleted',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServiceCategoriesController.prototype, "remove", null);
exports.ServiceCategoriesController = ServiceCategoriesController = __decorate([
    (0, swagger_1.ApiTags)('Service Categories'),
    (0, common_1.Controller)({
        path: 'service-categories',
        version: '1',
    }),
    __metadata("design:paramtypes", [service_categories_service_1.ServiceCategoriesService])
], ServiceCategoriesController);
//# sourceMappingURL=service-categories.controller.js.map