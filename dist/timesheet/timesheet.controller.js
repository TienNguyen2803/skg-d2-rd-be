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
exports.TimesheetController = void 0;
const common_1 = require("@nestjs/common");
const standard_pagination_1 = require("../utils/standard-pagination");
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
const timesheet_entity_1 = require("./entities/timesheet.entity");
let TimesheetController = exports.TimesheetController = class TimesheetController {
    constructor(timesheetService) {
        this.timesheetService = timesheetService;
    }
    create(createTimesheetDto, user) {
        return this.timesheetService.create(createTimesheetDto, user.id);
    }
    async findAll(page, limit, filterQuery, sort, user) {
        var _a;
        const isAdmin = ((_a = user.role) === null || _a === void 0 ? void 0 : _a.id) === roles_enum_1.RoleEnum.admin;
        return (0, standard_pagination_1.standardPagination)(await this.timesheetService.findManyWithPagination({
            page,
            limit,
            offset: (page - 1) * limit,
        }, filterQuery, sort, user.id, isAdmin), await this.timesheetService.standardCount(filterQuery, user.id, isAdmin));
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
    async remove(id) {
        await this.timesheetService.remove(id);
    }
    async exportExcel(month_year, res) {
        return this.timesheetService.exportToExcel(res, month_year);
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
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get timesheets list' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Get timesheets list',
        type: [timesheet_entity_1.Timesheet],
    }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('s')),
    __param(3, (0, common_1.Query)('sort')),
    __param(4, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, Object]),
    __metadata("design:returntype", Promise)
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
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete timesheet and related details' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'Timesheet has been successfully deleted',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/export-excel/:month_year'),
    __param(0, (0, common_1.Param)('month_year')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
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