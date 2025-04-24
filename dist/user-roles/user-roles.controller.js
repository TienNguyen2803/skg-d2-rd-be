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
exports.UserRolesController = void 0;
const common_1 = require("@nestjs/common");
const user_roles_service_1 = require("./user-roles.service");
const swagger_1 = require("@nestjs/swagger");
const user_role_entity_1 = require("./entities/user-role.entity");
const create_user_roles_dto_1 = require("./dto/create-user-roles.dto");
let UserRolesController = exports.UserRolesController = class UserRolesController {
    constructor(userRolesService) {
        this.userRolesService = userRolesService;
    }
    create(userId, roleId) {
        return this.userRolesService.createUserRole(userId, roleId);
    }
    createUserRoles(createUserRolesDto) {
        return this.userRolesService.createUserRoles(createUserRolesDto);
    }
    findUsersByRoleId(roleId) {
        return this.userRolesService.findUsersByRoleId(roleId);
    }
    removeAll(userId) {
        return this.userRolesService.removeAllUserRoles(userId);
    }
};
__decorate([
    (0, common_1.Post)(':userId/:roleId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Assign role to user' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Role has been successfully assigned to user.',
        type: user_role_entity_1.UserRole,
    }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('roleId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UserRolesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Assign multiple roles to users' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Roles have been successfully assigned to users.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_roles_dto_1.CreateUserRolesDto]),
    __metadata("design:returntype", void 0)
], UserRolesController.prototype, "createUserRoles", null);
__decorate([
    (0, common_1.Get)('role/:roleId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users by role ID' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'List of users for the specified role',
        type: [user_role_entity_1.UserRole],
    }),
    __param(0, (0, common_1.Param)('roleId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserRolesController.prototype, "findUsersByRoleId", null);
__decorate([
    (0, common_1.Delete)('user/:userId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Remove all roles from user' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'All roles have been successfully removed from user',
    }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserRolesController.prototype, "removeAll", null);
exports.UserRolesController = UserRolesController = __decorate([
    (0, swagger_1.ApiTags)('User Roles'),
    (0, common_1.Controller)({
        path: 'user-roles',
        version: '1',
    }),
    __metadata("design:paramtypes", [user_roles_service_1.UserRolesService])
], UserRolesController);
//# sourceMappingURL=user-roles.controller.js.map