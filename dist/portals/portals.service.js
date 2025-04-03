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
exports.PortalsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const filter_builder_1 = require("../utils/filter-builder");
const typeorm_2 = require("typeorm");
const portal_entity_1 = require("./entities/portal.entity");
let PortalsService = exports.PortalsService = class PortalsService {
    constructor(portalRepository) {
        this.portalRepository = portalRepository;
    }
    create(createPortalDto) {
        const portal = this.portalRepository.create(createPortalDto);
        return this.portalRepository.save(portal);
    }
    async findManyWithPagination({ page, limit, offset }, filterQuery, sort) {
        const findOptions = Object.assign(Object.assign({}, filter_builder_1.FilterBuilder.buildFilter(filterQuery)), { skip: offset, take: limit, order: {} });
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
        return this.portalRepository.find(findOptions);
    }
    standardCount(filterQuery) {
        const findOptions = filter_builder_1.FilterBuilder.buildFilter(filterQuery);
        return this.portalRepository.count(findOptions);
    }
    async findOne(id) {
        const portal = await this.portalRepository.findOneBy({ id });
        if (!portal) {
            throw new common_1.NotFoundException(`Portal with ID ${id} not found`);
        }
        return portal;
    }
    async update(id, updatePortalDto) {
        const portal = await this.findOne(id);
        Object.assign(portal, updatePortalDto);
        return this.portalRepository.save(portal);
    }
    async softDelete(id) {
        await this.portalRepository.softDelete(id);
    }
};
exports.PortalsService = PortalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(portal_entity_1.Portal)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PortalsService);
//# sourceMappingURL=portals.service.js.map