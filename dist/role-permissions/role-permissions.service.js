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
exports.RolePermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_permission_entity_1 = require("./entities/role-permission.entity");
const role_entity_1 = require("../roles/entities/role.entity");
const permission_entity_1 = require("../permissions/entities/permission.entity");
let RolePermissionsService = exports.RolePermissionsService = class RolePermissionsService {
    constructor(rolePermissionRepository, roleRepository, permissionRepository) {
        this.rolePermissionRepository = rolePermissionRepository;
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }
    async create(createRolePermissionDto) {
        try {
            const roleId = createRolePermissionDto.role_id;
            const role = await this.roleRepository.findOne({ where: { id: roleId } });
            if (!role) {
                throw new common_1.NotFoundException(`Role with ID ${roleId} not found`);
            }
            await this.rolePermissionRepository.delete({ role_id: roleId });
            if (!createRolePermissionDto.rolePermissions || createRolePermissionDto.rolePermissions.length === 0) {
                return {
                    success: true,
                    message: 'All role permissions deleted successfully',
                };
            }
            const permissionIds = [...new Set(createRolePermissionDto.rolePermissions.map(item => item.permission_id))];
            const permissions = await this.permissionRepository.find({ where: { id: (0, typeorm_2.In)(permissionIds) } });
            if (permissions.length !== permissionIds.length) {
                throw new common_1.NotFoundException('One or more permissions not found');
            }
            const rolePermissions = createRolePermissionDto.rolePermissions.map(item => {
                return this.rolePermissionRepository.create({
                    role_id: roleId,
                    permission_id: item.permission_id,
                });
            });
            await this.rolePermissionRepository.save(rolePermissions);
            return {
                success: true,
                message: 'Role permissions created successfully',
            };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.RolePermissionsService = RolePermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_permission_entity_1.RolePermission)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RolePermissionsService);
//# sourceMappingURL=role-permissions.service.js.map