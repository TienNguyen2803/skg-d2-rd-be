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
exports.TimesheetController = void 0;
const common_1 = require("@nestjs/common");
const timesheet_service_1 = require("./timesheet.service");
const create_timesheet_dto_1 = require("./dto/create-timesheet.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../roles/roles.decorator");
const roles_enum_1 = require("../roles/roles.enum");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../roles/roles.guard");
const current_user_decorator_1 = require("../decorators/user/current-user.decorator");
const update_timesheet_status_dto_1 = require("./dto/update-timesheet-status.dto");
const update_timesheet_reject_dto_1 = require("./dto/update-timesheet-reject.dto");
const ExcelJS = __importStar(require("exceljs"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let TimesheetController = exports.TimesheetController = class TimesheetController {
    constructor(timesheetService) {
        this.timesheetService = timesheetService;
    }
    create(createTimesheetDto, user) {
        console.log('user', user);
        return this.timesheetService.create(createTimesheetDto, user.id);
    }
    findAll(user) {
        return this.timesheetService.findAll(user.id);
    }
    findOne(id) {
        return this.timesheetService.findOne(id);
    }
    async updateStatus(id, updateStatusDto) {
        return this.timesheetService.updateStatus(id, updateStatusDto.status_code);
    }
    async updateRejectReason(id, updateRejectDto) {
        return this.timesheetService.updateRejectReason(id, updateRejectDto.reject_reason);
    }
    async exportExcel(res) {
        try {
            const templatePath = path.join(__dirname, '..', 'template', '【D2】_ Phieu theo doi lam them gio _ OT Records _ 202501.xlsx');
            if (!fs.existsSync(templatePath)) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send('Template file not found');
            }
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(templatePath);
            const data = [
                {
                    'stt': 1,
                    'department': 'Operation',
                    'project': 'S-CORE',
                    'type': 'Fixed Price',
                    'code': 'HauHT',
                    'name': 'Hoàng Thị Hậu',
                    'hour1': 10.0,
                    'hour2': 3.0,
                    'hour3': 5.0,
                    'hour4': 0.0,
                    'total': 31.0,
                    'Sheetname': 'HauHT',
                    'Hyperlink': 'Link',
                    'totalOT': 15.5,
                    'totalOT1': 15.5,
                }
            ];
            const sheet = workbook.getWorksheet(1);
            data.forEach((item, index) => {
                const rowIndex = index + 2;
                sheet.getCell(`A${rowIndex}`).value = item.stt;
                sheet.getCell(`B${rowIndex}`).value = item.department;
                sheet.getCell(`C${rowIndex}`).value = item.project;
                sheet.getCell(`D${rowIndex}`).value = item.type;
                sheet.getCell(`E${rowIndex}`).value = item.code;
                sheet.getCell(`F${rowIndex}`).value = item.name;
                sheet.getCell(`G${rowIndex}`).value = item.hour1;
                sheet.getCell(`H${rowIndex}`).value = item.hour2;
                sheet.getCell(`I${rowIndex}`).value = item.hour3;
                sheet.getCell(`J${rowIndex}`).value = item.hour4;
                sheet.getCell(`K${rowIndex}`).value = item.total;
                sheet.getCell(`L${rowIndex}`).value = {
                    text: item.Sheetname,
                    hyperlink: item.Hyperlink,
                };
                sheet.getCell(`M${rowIndex}`).value = item.totalOT;
                sheet.getCell(`N${rowIndex}`).value = item.totalOT1;
            });
            const buffer = await workbook.xlsx.writeBuffer();
            res.status(common_1.HttpStatus.OK).send(buffer);
        }
        catch (error) {
            console.error('Error exporting Excel:', error);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send('Failed to export Excel');
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_timesheet_dto_1.CreateTimesheetDto, Object]),
    __metadata("design:returntype", void 0)
], TimesheetController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TimesheetController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TimesheetController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update timesheet status' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Status has been successfully updated.',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_timesheet_status_dto_1.UpdateTimesheetStatusDto]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)(':id/reject'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update timesheet reject reason' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Reject reason has been successfully updated.',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_timesheet_reject_dto_1.UpdateTimesheetRejectDto]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "updateRejectReason", null);
__decorate([
    (0, common_1.Get)('export-excel'),
    (0, common_1.Header)('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
    (0, common_1.Header)('Content-Disposition', 'attachment; filename=OT_Records.xlsx'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "exportExcel", null);
exports.TimesheetController = TimesheetController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.user, roles_enum_1.RoleEnum.admin),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('Timesheet'),
    (0, common_1.Controller)({
        path: 'timesheets',
        version: '1',
    }),
    __metadata("design:paramtypes", [timesheet_service_1.TimesheetService])
], TimesheetController);
//# sourceMappingURL=timesheet.controller.js.map