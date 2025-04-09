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
exports.TimesheetDetailController = void 0;
const common_1 = require("@nestjs/common");
const timesheet_detail_service_1 = require("./timesheet-detail.service");
const create_timesheet_detail_dto_1 = require("./dto/create-timesheet-detail.dto");
const update_timesheet_detail_dto_1 = require("./dto/update-timesheet-detail.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../roles/roles.guard");
let TimesheetDetailController = exports.TimesheetDetailController = class TimesheetDetailController {
    constructor(timesheetDetailService) {
        this.timesheetDetailService = timesheetDetailService;
    }
    create(createTimesheetDetailDto) {
        console.log('createTimesheetDetailDto', createTimesheetDetailDto);
        return this.timesheetDetailService.create(createTimesheetDetailDto);
    }
    async findAll(page, limit, s) {
        return this.timesheetDetailService.findAll({
            page,
            limit,
            offset: (page - 1) * limit,
        }, s);
    }
    findOne(id) {
        return this.timesheetDetailService.findOne(id);
    }
    update(id, updateTimesheetDetailDto) {
        return this.timesheetDetailService.update(id, updateTimesheetDetailDto);
    }
    remove(id) {
        return this.timesheetDetailService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_timesheet_detail_dto_1.CreateTimesheetDetailDto]),
    __metadata("design:returntype", void 0)
], TimesheetDetailController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('s')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], TimesheetDetailController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TimesheetDetailController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_timesheet_detail_dto_1.UpdateTimesheetDetailDto]),
    __metadata("design:returntype", void 0)
], TimesheetDetailController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TimesheetDetailController.prototype, "remove", null);
exports.TimesheetDetailController = TimesheetDetailController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('Timesheet Detail'),
    (0, common_1.Controller)({
        path: 'timesheet-detail',
        version: '1',
    }),
    __metadata("design:paramtypes", [timesheet_detail_service_1.TimesheetDetailService])
], TimesheetDetailController);
//# sourceMappingURL=timesheet-detail.controller.js.map