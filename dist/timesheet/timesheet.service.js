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
const fs = __importStar(require("fs"));
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
    async findAll(creatorId, isAdmin) {
        const baseQuery = {
            relations: ['creator', 'project', 'department', 'status', 'details'],
        };
        if (!isAdmin) {
            return this.timesheetRepository.find(Object.assign(Object.assign({}, baseQuery), { where: { creator_id: creatorId } }));
        }
        return this.timesheetRepository.find(baseQuery);
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
    calculateOvertimeHours(details) {
        let weekdayBeforeHours = 0;
        let weekdayAfterHours = 0;
        let sundayBeforeHours = 0;
        let sundayAfterHours = 0;
        details.forEach(detail => {
            const date = new Date(detail.date);
            const dayOfWeek = date.getDay();
            const endTime = parseInt(detail.end_time.split(':')[0]);
            if (dayOfWeek === 0) {
                if (endTime < 22) {
                    sundayBeforeHours += detail.ot_hours;
                }
                else {
                    sundayAfterHours += detail.ot_hours;
                }
            }
            else if (dayOfWeek >= 1 && dayOfWeek <= 6) {
                if (endTime < 22) {
                    weekdayBeforeHours += detail.ot_hours;
                }
                else {
                    weekdayAfterHours += detail.ot_hours;
                }
            }
        });
        return { weekdayBeforeHours, weekdayAfterHours, sundayBeforeHours, sundayAfterHours };
    }
    async exportToExcel(res) {
        try {
            const templatePath = path.join(process.cwd(), 'src', 'template', 'template.xlsx');
            if (!fs.existsSync(templatePath)) {
                throw new common_1.NotFoundException('Template file not found');
            }
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(templatePath);
            const worksheetNames = workbook.worksheets.map(ws => ws.name);
            console.log('Available worksheets:', worksheetNames);
            const worksheet = workbook.getWorksheet('01.Summary');
            if (!worksheet) {
                throw new common_1.NotFoundException('Excel worksheet not found');
            }
            const datax = await this.findAll(0, true);
            console.log(datax);
            try {
                datax.forEach((item, index) => {
                    console.log('item', item.details);
                    const { weekdayBeforeHours, weekdayAfterHours, sundayBeforeHours, sundayAfterHours } = this.calculateOvertimeHours(item.details);
                    const rowIndex = index + 8;
                    worksheet.getCell(`A${rowIndex}`).value = index + 1;
                    worksheet.getCell(`B${rowIndex}`).value = "Operation";
                    worksheet.getCell(`C${rowIndex}`).value = item.project.name;
                    worksheet.getCell(`D${rowIndex}`).value = "Fixed Price";
                    worksheet.getCell(`E${rowIndex}`).value = item.creator.short_name;
                    worksheet.getCell(`F${rowIndex}`).value = item.creator.firstName + " " + item.creator.lastName;
                    worksheet.getCell(`G${rowIndex}`).value = weekdayBeforeHours;
                    worksheet.getCell(`H${rowIndex}`).value = weekdayAfterHours;
                    worksheet.getCell(`I${rowIndex}`).value = sundayBeforeHours;
                    worksheet.getCell(`J${rowIndex}`).value = sundayAfterHours;
                    worksheet.getCell(`K${rowIndex}`).value = 0;
                    worksheet.getCell(`L${rowIndex}`).value = 0;
                    worksheet.getCell(`M${rowIndex}`).value = weekdayBeforeHours * 1.5 + weekdayAfterHours * 2 + sundayBeforeHours * 2 + sundayAfterHours * 2.5;
                    worksheet.getCell(`N${rowIndex}`).value = item.creator.short_name;
                    worksheet.getCell(`O${rowIndex}`).value = "Link";
                    worksheet.getCell(`P${rowIndex}`).value = {
                        formula: `M${rowIndex}/2`
                    };
                    worksheet.getCell(`Q${rowIndex}`).value = {
                        formula: `M${rowIndex}/2`
                    };
                });
                const buffer = await workbook.xlsx.writeBuffer();
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', 'attachment; filename=OT_Records.xlsx');
                res.end(buffer);
                return {};
            }
            catch (error) {
                console.error('Error writing Excel data:', error);
                throw new common_1.InternalServerErrorException('Error writing Excel data: ' + error.message);
            }
        }
        catch (error) {
            console.error('Error exporting Excel:', error.message);
            throw new common_1.InternalServerErrorException('Failed to export Excel: ' + error.message);
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