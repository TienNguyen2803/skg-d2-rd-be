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
const timesheet_service_1 = require("./timesheet.service");
const create_timesheet_dto_1 = require("./dto/create-timesheet.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../roles/roles.decorator");
const roles_enum_1 = require("../roles/roles.enum");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../roles/roles.guard");
const current_user_decorator_1 = require("../decorators/user/current-user.decorator");
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
exports.TimesheetController = TimesheetController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)([roles_enum_1.RoleEnum.user, roles_enum_1.RoleEnum.admin]),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('Timesheet'),
    (0, common_1.Controller)({
        path: 'timesheets',
        version: '1',
    }),
    __metadata("design:paramtypes", [timesheet_service_1.TimesheetService])
], TimesheetController);
//# sourceMappingURL=timesheet.controller.js.map