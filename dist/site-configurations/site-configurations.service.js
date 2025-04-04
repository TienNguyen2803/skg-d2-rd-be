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
exports.SiteConfigurationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const site_configuration_entity_1 = require("./entities/site-configuration.entity");
const filter_builder_1 = require("../utils/filter-builder");
let SiteConfigurationsService = exports.SiteConfigurationsService = class SiteConfigurationsService {
    constructor(siteConfigurationRepository) {
        this.siteConfigurationRepository = siteConfigurationRepository;
    }
    async create(createSiteConfigurationDto) {
        const siteConfiguration = this.siteConfigurationRepository.create(Object.assign(Object.assign({}, createSiteConfigurationDto), { logo_path: createSiteConfigurationDto.logo_path ? `/uploads/${createSiteConfigurationDto.logo_path}` : null, favicon_path: createSiteConfigurationDto.favicon_path ? `/uploads/${createSiteConfigurationDto.favicon_path}` : null, footer_logo_path: createSiteConfigurationDto.footer_logo_path ? `/uploads/${createSiteConfigurationDto.footer_logo_path}` : null }));
        return this.siteConfigurationRepository.save(siteConfiguration);
    }
    async findManyWithPagination({ page, limit, offset }, filterQuery, sort) {
        const findOptions = Object.assign(Object.assign({}, filter_builder_1.FilterBuilder.buildFilter(filterQuery)), { skip: offset, take: limit, order: sort ? { [sort.split(',')[0]]: sort.split(',')[1] } : { id: 'DESC' } });
        return this.siteConfigurationRepository.find(findOptions);
    }
    standardCount(filterQuery) {
        const findOptions = filter_builder_1.FilterBuilder.buildFilter(filterQuery);
        return this.siteConfigurationRepository.count(findOptions);
    }
    async findOne(id) {
        const siteConfiguration = await this.siteConfigurationRepository.findOne({
            where: { id },
        });
        if (!siteConfiguration) {
            throw new common_1.NotFoundException(`Site configuration with ID ${id} not found`);
        }
        return siteConfiguration;
    }
    async update(id, updateSiteConfigurationDto) {
        const siteConfiguration = await this.findOne(id);
        const updatedData = Object.assign(Object.assign({}, updateSiteConfigurationDto), { logo_path: updateSiteConfigurationDto.logo_path ? `/uploads/${updateSiteConfigurationDto.logo_path}` : siteConfiguration.logo_path, favicon_path: updateSiteConfigurationDto.favicon_path ? `/uploads/${updateSiteConfigurationDto.favicon_path}` : siteConfiguration.favicon_path, footer_logo_path: updateSiteConfigurationDto.footer_logo_path ? `/uploads/${updateSiteConfigurationDto.footer_logo_path}` : siteConfiguration.footer_logo_path });
        Object.assign(siteConfiguration, updatedData);
        return this.siteConfigurationRepository.save(siteConfiguration);
    }
    async softDelete(id) {
        await this.findOne(id);
        await this.siteConfigurationRepository.softDelete(id);
    }
};
exports.SiteConfigurationsService = SiteConfigurationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(site_configuration_entity_1.SiteConfiguration)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SiteConfigurationsService);
//# sourceMappingURL=site-configurations.service.js.map