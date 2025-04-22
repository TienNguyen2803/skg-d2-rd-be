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
exports.RolePermissionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_permissions_service_1 = require("./role-permissions.service");
const create_role_permission_dto_1 = require("./dto/create-role-permission.dto");
let RolePermissionsController = exports.RolePermissionsController = class RolePermissionsController {
    constructor(rolePermissionsService) {
        this.rolePermissionsService = rolePermissionsService;
    }
    async create(createRolePermissionDto) {
        return this.rolePermissionsService.create(createRolePermissionDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create role permissions' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Role permissions have been successfully created.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input data.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Role or permission not found.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_permission_dto_1.CreateRolePermissionDto]),
    __metadata("design:returntype", Promise)
], RolePermissionsController.prototype, "create", null);
exports.RolePermissionsController = RolePermissionsController = __decorate([
    (0, swagger_1.ApiTags)('Role Permissions'),
    (0, common_1.Controller)({
        path: 'role-permissions',
        version: '1',
    }),
    __metadata("design:paramtypes", [role_permissions_service_1.RolePermissionsService])
], RolePermissionsController);
//# sourceMappingURL=role-permissions.controller.js.map