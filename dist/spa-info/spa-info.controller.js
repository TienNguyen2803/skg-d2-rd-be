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
exports.SpaInfoController = void 0;
const common_1 = require("@nestjs/common");
const update_spa_info_dto_1 = require("./dto/update-spa-info.dto");
const standard_pagination_1 = require("../utils/standard-pagination");
const spa_info_service_1 = require("./spa-info.service");
const create_spa_info_dto_1 = require("./dto/create-spa-info.dto");
const swagger_1 = require("@nestjs/swagger");
const spa_info_entity_1 = require("./entities/spa-info.entity");
let SpaInfoController = exports.SpaInfoController = class SpaInfoController {
    constructor(spaInfoService) {
        this.spaInfoService = spaInfoService;
    }
    create(createSpaInfoDto) {
        return this.spaInfoService.create(createSpaInfoDto);
    }
    async findAll(page, limit, filterQuery, sort) {
        console.log('Received sort parameter:', sort);
        return (0, standard_pagination_1.standardPagination)(await this.spaInfoService.findManyWithPagination({
            page,
            limit,
            offset: (page - 1) * limit,
        }, filterQuery, sort), await this.spaInfoService.standardCount(filterQuery));
    }
    findOne(id) {
        return this.spaInfoService.findOne(id);
    }
    update(id, updateSpaInfoDto) {
        return this.spaInfoService.update(id, updateSpaInfoDto);
    }
    async remove(id) {
        await this.spaInfoService.softDelete(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create new spa info' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Spa info has been successfully created.',
        type: spa_info_entity_1.SpaInfo,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_spa_info_dto_1.CreateSpaInfoDto]),
    __metadata("design:returntype", Promise)
], SpaInfoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get spa info list' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Get spa info list',
        type: [spa_info_entity_1.SpaInfo],
    }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('s')),
    __param(3, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], SpaInfoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get spa info by id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Get spa info by id',
        type: spa_info_entity_1.SpaInfo,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SpaInfoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update spa info' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Spa info has been successfully updated',
        type: spa_info_entity_1.SpaInfo,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_spa_info_dto_1.UpdateSpaInfoDto]),
    __metadata("design:returntype", Promise)
], SpaInfoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete spa info' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'Spa info has been successfully deleted',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SpaInfoController.prototype, "remove", null);
exports.SpaInfoController = SpaInfoController = __decorate([
    (0, swagger_1.ApiTags)('Spa Info'),
    (0, common_1.Controller)({
        path: 'spa-info',
        version: '1',
    }),
    __metadata("design:paramtypes", [spa_info_service_1.SpaInfoService])
], SpaInfoController);
//# sourceMappingURL=spa-info.controller.js.map