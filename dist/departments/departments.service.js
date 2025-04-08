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
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const department_entity_1 = require("./entities/department.entity");
const filter_builder_1 = require("../utils/filter-builder");
let DepartmentsService = exports.DepartmentsService = class DepartmentsService {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    async create(createDepartmentDto) {
        const department = this.departmentRepository.create(createDepartmentDto);
        return this.departmentRepository.save(department);
    }
    async findManyWithPagination({ page, limit, offset }, filterQuery, sort) {
        const findOptions = Object.assign(Object.assign({}, filter_builder_1.FilterBuilder.buildFilter(filterQuery)), { skip: offset, take: limit, relations: ['users'], order: sort ? { [sort.split(',')[0]]: sort.split(',')[1] } : { id: 'DESC' } });
        return this.departmentRepository.find(findOptions);
    }
    standardCount(filterQuery) {
        const findOptions = filter_builder_1.FilterBuilder.buildFilter(filterQuery);
        return this.departmentRepository.count(findOptions);
    }
    async findOne(id) {
        const department = await this.departmentRepository.findOne({
            where: { id },
            relations: ['users'],
        });
        if (!department) {
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
        return department;
    }
    async update(id, updateDepartmentDto) {
        const department = await this.findOne(id);
        Object.assign(department, updateDepartmentDto);
        return this.departmentRepository.save(department);
    }
    async softDelete(id) {
        const department = await this.findOne(id);
        await this.departmentRepository.softDelete(id);
    }
};
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map