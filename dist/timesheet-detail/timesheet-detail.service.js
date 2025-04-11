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
exports.TimesheetDetailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const timesheet_detail_entity_1 = require("./entities/timesheet-detail.entity");
const filter_builder_1 = require("../utils/filter-builder");
const standard_pagination_1 = require("../utils/standard-pagination");
const timesheet_entity_1 = require("../timesheet/entities/timesheet.entity");
let TimesheetDetailService = exports.TimesheetDetailService = class TimesheetDetailService {
    constructor(timesheetDetailRepository, timesheetRepository) {
        this.timesheetDetailRepository = timesheetDetailRepository;
        this.timesheetRepository = timesheetRepository;
    }
    async create(createTimesheetDetailDto) {
        try {
            const timesheetDetail = this.timesheetDetailRepository.create(Object.assign(Object.assign({}, createTimesheetDetailDto), { ot_hours: createTimesheetDetailDto.ot_hours ? Number(createTimesheetDetailDto.ot_hours) : 0 }));
            const savedDetail = await this.timesheetDetailRepository.save(timesheetDetail);
            const timesheet = await this.timesheetRepository.findOne({
                where: { id: createTimesheetDetailDto.timesheet_id },
            });
            if (!timesheet) {
                throw new common_1.NotFoundException(`Timesheet with ID ${createTimesheetDetailDto.timesheet_id} not found`);
            }
            timesheet.total_hours = (timesheet.total_hours || 0) + (savedDetail.ot_hours || 0);
            await this.timesheetRepository.save(timesheet);
            return savedDetail;
        }
        catch (error) {
            throw new Error('Error creating timesheet detail: ' + error.message);
        }
    }
    async findAll(paginationOptions, filterQuery) {
        const findOptions = Object.assign(Object.assign({}, filter_builder_1.FilterBuilder.buildFilter(filterQuery)), { skip: paginationOptions.offset, take: paginationOptions.limit, relations: ['timesheet'] });
        return (0, standard_pagination_1.standardPagination)(await this.timesheetDetailRepository.find(findOptions), await this.timesheetDetailRepository.count(findOptions));
    }
    async findOne(id) {
        const timesheetDetail = await this.timesheetDetailRepository.findOne({
            where: { id },
            relations: ['timesheet'],
        });
        if (!timesheetDetail) {
            throw new common_1.NotFoundException(`Timesheet detail with ID ${id} not found`);
        }
        return timesheetDetail;
    }
    async update(id, updateTimesheetDetailDto) {
        const timesheetDetail = await this.findOne(id);
        Object.assign(timesheetDetail, updateTimesheetDetailDto);
        return this.timesheetDetailRepository.save(timesheetDetail);
    }
    async remove(id) {
        await this.timesheetDetailRepository.softDelete(id);
    }
};
exports.TimesheetDetailService = TimesheetDetailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(timesheet_detail_entity_1.TimesheetDetail)),
    __param(1, (0, typeorm_1.InjectRepository)(timesheet_entity_1.Timesheet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TimesheetDetailService);
//# sourceMappingURL=timesheet-detail.service.js.map