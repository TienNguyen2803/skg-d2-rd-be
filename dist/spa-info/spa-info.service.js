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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaInfoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const banner_entity_1 = require("../banners/entities/banner.entity");
const filter_builder_1 = require("../utils/filter-builder");
const working_hour_entity_1 = require("../working-hours/entities/working-hour.entity");
const typeorm_2 = require("typeorm");
const spa_info_entity_1 = require("./entities/spa-info.entity");
let SpaInfoService = exports.SpaInfoService = class SpaInfoService {
    constructor(spaInfoRepository, dataSource) {
        this.spaInfoRepository = spaInfoRepository;
        this.dataSource = dataSource;
    }
    async create(createSpaInfoDto) {
        const { banners, workingHours } = createSpaInfoDto, spaInfoData = __rest(createSpaInfoDto, ["banners", "workingHours"]);
        const spaInfo = this.spaInfoRepository.create(Object.assign(Object.assign({}, spaInfoData), { banners: banners === null || banners === void 0 ? void 0 : banners.map(banner => ({
                image_url: banner.image_url,
                title: banner.title,
                subtitle: banner.subtitle,
                order: banner.order,
                is_active: banner.is_active,
                type: banner.type
            })), workingHours: workingHours === null || workingHours === void 0 ? void 0 : workingHours.map(wh => ({
                day_of_week: wh.day_of_week,
                opening_time: wh.opening_time,
                closing_time: wh.closing_time,
                is_closed: false
            })) }));
        await this.spaInfoRepository.save(spaInfo);
        await this.spaInfoRepository.save(spaInfo);
        return this.spaInfoRepository.findOneOrFail({
            where: { id: spaInfo.id },
            relations: ['banners', 'workingHours']
        });
    }
    async update(id, updateSpaInfoDto) {
        const { banners, workingHours } = updateSpaInfoDto, spaInfoData = __rest(updateSpaInfoDto, ["banners", "workingHours"]);
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const existingSpaInfo = await queryRunner.manager.findOne(spa_info_entity_1.SpaInfo, {
                where: { id },
                relations: ['banners', 'workingHours']
            });
            if (!existingSpaInfo) {
                throw new common_1.NotFoundException(`SpaInfo with ID ${id} not found`);
            }
            Object.assign(existingSpaInfo, spaInfoData);
            await queryRunner.manager.save(existingSpaInfo);
            if (banners) {
                const bannersToKeep = banners.filter(b => b.id).map(b => b.id);
                if (existingSpaInfo.banners && existingSpaInfo.banners.length > 0) {
                    const bannersToDelete = existingSpaInfo.banners.filter(banner => !bannersToKeep.includes(banner.id));
                    if (bannersToDelete.length > 0) {
                        await queryRunner.manager.remove(bannersToDelete);
                    }
                }
                for (const bannerData of banners) {
                    if (bannerData.id) {
                        const existingBanner = existingSpaInfo.banners.find(b => b.id === bannerData.id);
                        if (existingBanner) {
                            Object.assign(existingBanner, {
                                image_url: bannerData.image_url,
                                title: bannerData.title,
                                subtitle: bannerData.subtitle,
                                order: bannerData.order || 0,
                                is_active: bannerData.is_active === undefined ? true : bannerData.is_active,
                                type: bannerData.type || 0
                            });
                            await queryRunner.manager.save(existingBanner);
                        }
                    }
                    else {
                        const newBanner = new banner_entity_1.Banner();
                        Object.assign(newBanner, {
                            image_url: bannerData.image_url,
                            title: bannerData.title,
                            subtitle: bannerData.subtitle,
                            order: bannerData.order || 0,
                            is_active: bannerData.is_active === undefined ? true : bannerData.is_active,
                            type: bannerData.type || 0,
                            spa_info_id: existingSpaInfo.id
                        });
                        await queryRunner.manager.save(newBanner);
                    }
                }
            }
            if (workingHours) {
                const hoursToKeep = workingHours.filter(wh => wh.id).map(wh => wh.id);
                if (existingSpaInfo.workingHours && existingSpaInfo.workingHours.length > 0) {
                    const hoursToDelete = existingSpaInfo.workingHours.filter(hour => !hoursToKeep.includes(hour.id));
                    if (hoursToDelete.length > 0) {
                        await queryRunner.manager.remove(hoursToDelete);
                    }
                }
                for (const hourData of workingHours) {
                    if (hourData.id) {
                        const existingHour = existingSpaInfo.workingHours.find(h => h.id === hourData.id);
                        if (existingHour) {
                            Object.assign(existingHour, {
                                day_of_week: hourData.day_of_week,
                                opening_time: hourData.opening_time,
                                closing_time: hourData.closing_time,
                            });
                            await queryRunner.manager.save(existingHour);
                        }
                    }
                    else {
                        const newHour = new working_hour_entity_1.WorkingHour();
                        Object.assign(newHour, {
                            day_of_week: hourData.day_of_week,
                            opening_time: hourData.opening_time,
                            closing_time: hourData.closing_time,
                            spa_info_id: existingSpaInfo.id
                        });
                        await queryRunner.manager.save(newHour);
                    }
                }
            }
            await queryRunner.commitTransaction();
            return this.spaInfoRepository.findOneOrFail({
                where: { id },
                relations: ['banners', 'workingHours']
            });
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findManyWithPagination({ page, limit, offset }, filterQuery, sort) {
        const findOptions = Object.assign(Object.assign({}, filter_builder_1.FilterBuilder.buildFilter(filterQuery)), { skip: offset, take: limit, relations: ['banners', 'workingHours'], order: {} });
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
        console.log('Sort options:', findOptions.order);
        return this.spaInfoRepository.find(findOptions);
    }
    standardCount(filterQuery) {
        const findOptions = filter_builder_1.FilterBuilder.buildFilter(filterQuery);
        return this.spaInfoRepository.count(findOptions);
    }
    findOne(id) {
        return this.spaInfoRepository.findOneOrFail({
            where: { id },
            relations: ['banners', 'workingHours'],
        });
    }
    async softDelete(id) {
        await this.spaInfoRepository.softDelete(id);
    }
};
exports.SpaInfoService = SpaInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(spa_info_entity_1.SpaInfo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], SpaInfoService);
//# sourceMappingURL=spa-info.service.js.map