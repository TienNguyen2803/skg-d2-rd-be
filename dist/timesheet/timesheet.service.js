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
exports.TimesheetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const timesheet_entity_1 = require("./entities/timesheet.entity");
const timesheet_status_entity_1 = require("../timesheet-status/entities/timesheet-status.entity");
let TimesheetService = exports.TimesheetService = class TimesheetService {
    constructor(timesheetRepository, timesheetStatusRepository) {
        this.timesheetRepository = timesheetRepository;
        this.timesheetStatusRepository = timesheetStatusRepository;
    }
    async create(createTimesheetDto, userId) {
        const draftStatus = await this.timesheetStatusRepository.findOneOrFail({
            where: { code: 'DRAFT' },
        });
        const timesheet = this.timesheetRepository.create(Object.assign(Object.assign({}, createTimesheetDto), { creator_id: userId, status_id: draftStatus.id, total_hours: createTimesheetDto.total_hours ? Number(createTimesheetDto.total_hours) : 0 }));
        return this.timesheetRepository.save(timesheet);
    }
    async findAll(creatorId) {
        return this.timesheetRepository.find({
            where: { creator_id: creatorId },
            relations: ['creator', 'project', 'department', 'status', 'details'],
        });
    }
    async findOne(id) {
        const timesheet = await this.timesheetRepository.findOne({
            where: { id },
            relations: ['creator', 'project', 'department', 'status', 'details'],
        });
        if (!timesheet) {
            throw new common_1.NotFoundException(`Timesheet with ID ${id} not found`);
        }
        return timesheet;
    }
    async updateStatus(id, status_code) {
        const timesheet = await this.findOne(id);
        if (!timesheet) {
            throw new common_1.NotFoundException(`Timesheet with ID ${id} not found`);
        }
        const status = await this.timesheetStatusRepository.findOne({
            where: { code: status_code }
        });
        if (!status) {
            throw new common_1.NotFoundException(`Status with code ${status_code} not found`);
        }
        timesheet.status = { id: status.id };
        return this.timesheetRepository.save(timesheet);
    }
    async updateRejectReason(id, reject_reason) {
        const timesheet = await this.findOne(id);
        if (!timesheet) {
            throw new common_1.NotFoundException(`Timesheet with ID ${id} not found`);
        }
        timesheet.reject_reason = reject_reason;
        const status = await this.timesheetStatusRepository.findOne({
            where: { code: "REJECT" }
        });
        if (!status) {
            throw new common_1.NotFoundException(`Status with code REJECT not found`);
        }
        timesheet.status = { id: status.id };
        return this.timesheetRepository.save(timesheet);
    }
};
exports.TimesheetService = TimesheetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(timesheet_entity_1.Timesheet)),
    __param(1, (0, typeorm_1.InjectRepository)(timesheet_status_entity_1.TimesheetStatus)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TimesheetService);
//# sourceMappingURL=timesheet.service.js.map