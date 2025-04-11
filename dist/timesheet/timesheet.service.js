"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const ExcelJS = __importStar(require("exceljs"));
const path = __importStar(require("path"));
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
    async remove(id) {
        const timesheet = await this.findOne(id);
        if (!timesheet) {
            throw new common_1.NotFoundException(`Timesheet with ID ${id} not found`);
        }
        await this.timesheetRepository.manager.transaction(async (manager) => {
            await manager
                .createQueryBuilder()
                .softDelete()
                .from('timesheet_detail')
                .where('timesheet_id = :id', { id })
                .execute();
            await manager.softDelete('timesheet', { id });
        });
    }
    async exportToExcel(data) {
        try {
            const templatePath = path.join(process.cwd(), 'src', 'template', '【D2】_ Phieu theo doi lam them gio _ OT Records _ 202501.xlsx');
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(templatePath);
            const worksheet = workbook.getWorksheet(1);
            if (!worksheet) {
                throw new Error('Worksheet not found');
            }
            const startRow = 5;
            data.forEach((item, index) => {
                const row = worksheet.getRow(startRow + index);
                row.getCell(1).value = item.STT;
                row.getCell(2).value = item.Phòng;
                row.getCell(3).value = item['Dự án'];
                row.getCell(4).value = item['Loại dự án'];
                row.getCell(5).value = item['Mã nhân viên'];
                row.getCell(6).value = item['Họ và tên'];
                row.getCell(7).value = item['Số giờ làm thêm từ T2-T7'];
                row.getCell(8).value = item['Số giờ làm thêm đêm từ T2-T7 (Sau 22h00)'];
                row.getCell(9).value = item['Số giờ làm thêm đêm CN (Sau 22h00)'];
                row.getCell(10).value = item['Số giờ làm thêm ngày lễ (Sau 22h00)'];
                row.getCell(11).value = item['Tổng số giờ làm thêm'];
                row.getCell(12).value = item['Sheet name'];
                row.getCell(13).value = { text: 'Link', hyperlink: item['Hyperlink'] };
                row.getCell(14).value = item['Số giờ lương OT'];
                row.getCell(15).value = item['Số giờ nghỉ bù OT'];
                [7, 8, 9, 10, 11, 14, 15].forEach(col => {
                    row.getCell(col).numFmt = '0.00';
                });
            });
            const buffer = await workbook.xlsx.writeBuffer();
            return buffer;
        }
        catch (error) {
            throw new Error(`Failed to export Excel: ${error.message}`);
        }
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