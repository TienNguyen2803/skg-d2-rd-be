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
exports.EmployeeTypesController = void 0;
const common_1 = require("@nestjs/common");
const employee_types_service_1 = require("./employee-types.service");
const create_employee_type_dto_1 = require("./dto/create-employee-type.dto");
const update_employee_type_dto_1 = require("./dto/update-employee-type.dto");
const swagger_1 = require("@nestjs/swagger");
const employee_type_entity_1 = require("./entities/employee-type.entity");
const standard_pagination_1 = require("../utils/standard-pagination");
let EmployeeTypesController = exports.EmployeeTypesController = class EmployeeTypesController {
    constructor(employeeTypesService) {
        this.employeeTypesService = employeeTypesService;
    }
    create(createEmployeeTypeDto) {
        return this.employeeTypesService.create(createEmployeeTypeDto);
    }
    async findAll(page, limit, search) {
        return (0, standard_pagination_1.standardPagination)(await this.employeeTypesService.findManyWithPagination({
            page,
            limit,
            offset: (page - 1) * limit,
        }, search), await this.employeeTypesService.standardCount(search));
    }
    findOne(id) {
        return this.employeeTypesService.findOne(id);
    }
    update(id, updateEmployeeTypeDto) {
        return this.employeeTypesService.update(id, updateEmployeeTypeDto);
    }
    remove(id) {
        return this.employeeTypesService.softDelete(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create new employee type' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Employee type has been successfully created.',
        type: employee_type_entity_1.EmployeeType,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_type_dto_1.CreateEmployeeTypeDto]),
    __metadata("design:returntype", Promise)
], EmployeeTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get employee type list' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Get employee type list',
        type: [employee_type_entity_1.EmployeeType],
    }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('s')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], EmployeeTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get employee type by id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Get employee type by id',
        type: employee_type_entity_1.EmployeeType,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EmployeeTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update employee type' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Employee type has been successfully updated',
        type: employee_type_entity_1.EmployeeType,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_employee_type_dto_1.UpdateEmployeeTypeDto]),
    __metadata("design:returntype", Promise)
], EmployeeTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete employee type' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'Employee type has been successfully deleted',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EmployeeTypesController.prototype, "remove", null);
exports.EmployeeTypesController = EmployeeTypesController = __decorate([
    (0, swagger_1.ApiTags)('Employee Types'),
    (0, common_1.Controller)({
        path: 'employee-types',
        version: '1',
    }),
    __metadata("design:paramtypes", [employee_types_service_1.EmployeeTypesService])
], EmployeeTypesController);
//# sourceMappingURL=employee-types.controller.js.map