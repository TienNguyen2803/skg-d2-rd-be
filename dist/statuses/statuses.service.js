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
exports.StatusesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const status_entity_1 = require("./entities/status.entity");
const filter_builder_1 = require("../utils/filter-builder");
let StatusesService = exports.StatusesService = class StatusesService {
    constructor(statusRepository) {
        this.statusRepository = statusRepository;
    }
    create(createStatusDto) {
        const status = this.statusRepository.create(createStatusDto);
        return this.statusRepository.save(status);
    }
    async findManyWithPagination({ page, limit, offset }, search) {
        const findOptions = Object.assign(Object.assign({}, filter_builder_1.FilterBuilder.buildFilter(search)), { skip: offset, take: limit, order: { id: 'DESC' } });
        return this.statusRepository.find(findOptions);
    }
    standardCount(search) {
        const findOptions = filter_builder_1.FilterBuilder.buildFilter(search);
        return this.statusRepository.count(findOptions);
    }
    async findOne(id) {
        const status = await this.statusRepository.findOne({
            where: { id },
        });
        if (!status) {
            throw new common_1.NotFoundException(`Status with ID ${id} not found`);
        }
        return status;
    }
    async update(id, updateStatusDto) {
        const status = await this.findOne(id);
        Object.assign(status, updateStatusDto);
        return this.statusRepository.save(status);
    }
    async softDelete(id) {
        await this.statusRepository.softDelete(id);
    }
};
exports.StatusesService = StatusesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(status_entity_1.Status)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StatusesService);
//# sourceMappingURL=statuses.service.js.map