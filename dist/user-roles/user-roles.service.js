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
exports.UserRolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_role_entity_1 = require("./entities/user-role.entity");
let UserRolesService = exports.UserRolesService = class UserRolesService {
    constructor(userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }
    async createUserRole(userId, roleId) {
        const userRole = this.userRoleRepository.create({
            user_id: userId,
            role_id: roleId,
        });
        return this.userRoleRepository.save(userRole);
    }
    async findUserRoles(userId) {
        return this.userRoleRepository.find({
            where: { user_id: userId },
            relations: ['role'],
        });
    }
    async removeUserRole(userId, roleId) {
        await this.userRoleRepository.delete({
            user_id: userId,
            role_id: roleId,
        });
    }
    async removeAllUserRoles(userId) {
        await this.userRoleRepository.delete({ user_id: userId });
    }
};
exports.UserRolesService = UserRolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserRolesService);
//# sourceMappingURL=user-roles.service.js.map