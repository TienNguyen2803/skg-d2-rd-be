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
exports.EmployeeTypesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_type_entity_1 = require("./entities/employee-type.entity");
const filter_builder_1 = require("../utils/filter-builder");
let EmployeeTypesService = exports.EmployeeTypesService = class EmployeeTypesService {
    constructor(employeeTypeRepository) {
        this.employeeTypeRepository = employeeTypeRepository;
    }
    create(createEmployeeTypeDto) {
        const employeeType = this.employeeTypeRepository.create(createEmployeeTypeDto);
        return this.employeeTypeRepository.save(employeeType);
    }
    async findManyWithPagination({ page, limit, offset }, search) {
        const findOptions = Object.assign(Object.assign({}, filter_builder_1.FilterBuilder.buildFilter(search)), { skip: offset, take: limit, order: { id: 'DESC' } });
        return this.employeeTypeRepository.find(findOptions);
    }
    standardCount(search) {
        const findOptions = filter_builder_1.FilterBuilder.buildFilter(search);
        return this.employeeTypeRepository.count(findOptions);
    }
    async findOne(id) {
        const employeeType = await this.employeeTypeRepository.findOne({
            where: { id },
        });
        if (!employeeType) {
            throw new common_1.NotFoundException(`Employee Type with ID ${id} not found`);
        }
        return employeeType;
    }
    async update(id, updateEmployeeTypeDto) {
        const employeeType = await this.findOne(id);
        Object.assign(employeeType, updateEmployeeTypeDto);
        return this.employeeTypeRepository.save(employeeType);
    }
    async softDelete(id) {
        await this.employeeTypeRepository.softDelete(id);
    }
};
exports.EmployeeTypesService = EmployeeTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_type_entity_1.EmployeeType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeeTypesService);
//# sourceMappingURL=employee-types.service.js.map