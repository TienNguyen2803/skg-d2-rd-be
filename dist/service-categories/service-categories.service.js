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
exports.ServiceCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const service_category_entity_1 = require("./entities/service-category.entity");
const filter_builder_1 = require("../utils/filter-builder");
let ServiceCategoriesService = exports.ServiceCategoriesService = class ServiceCategoriesService {
    constructor(serviceCategoryRepository) {
        this.serviceCategoryRepository = serviceCategoryRepository;
    }
    async create(createServiceCategoryDto) {
        const serviceCategory = this.serviceCategoryRepository.create(createServiceCategoryDto);
        return this.serviceCategoryRepository.save(serviceCategory);
    }
    async findManyWithPagination({ page, limit, offset }, filterQuery, sort) {
        console.log(filterQuery);
        const findOptions = Object.assign(Object.assign({}, filter_builder_1.FilterBuilder.buildFilter(filterQuery)), { skip: offset, take: limit, relations: ['services'], order: {} });
        if (sort) {
            const [field, direction] = sort.split(',');
            if (field && direction) {
                const upperDirection = direction.toUpperCase();
                if (upperDirection === 'ASC' || upperDirection === 'DESC') {
                    findOptions.order = { [field]: upperDirection };
                }
            }
        }
        else {
            findOptions.order = { id: 'DESC' };
        }
        return this.serviceCategoryRepository.find(findOptions);
    }
    standardCount(filterQuery) {
        const findOptions = filter_builder_1.FilterBuilder.buildFilter(filterQuery);
        return this.serviceCategoryRepository.count(findOptions);
    }
    async findOne(id) {
        const serviceCategory = await this.serviceCategoryRepository.findOne({
            where: { id },
            relations: ['services'],
        });
        if (!serviceCategory) {
            throw new common_1.NotFoundException(`Service category with ID ${id} not found`);
        }
        return serviceCategory;
    }
    async update(id, updateServiceCategoryDto) {
        const serviceCategory = await this.findOne(id);
        Object.assign(serviceCategory, updateServiceCategoryDto);
        return this.serviceCategoryRepository.save(serviceCategory);
    }
    async softDelete(id) {
        await this.findOne(id);
        await this.serviceCategoryRepository.softDelete(id);
    }
};
exports.ServiceCategoriesService = ServiceCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_category_entity_1.ServiceCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServiceCategoriesService);
//# sourceMappingURL=service-categories.service.js.map