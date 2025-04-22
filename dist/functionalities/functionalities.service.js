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
exports.FunctionalitiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const functionality_entity_1 = require("./entities/functionality.entity");
let FunctionalitiesService = exports.FunctionalitiesService = class FunctionalitiesService {
    constructor(functionalityRepository) {
        this.functionalityRepository = functionalityRepository;
        this.convertToPermissionDto = (data) => {
            return data.map(item => {
                const actions = item.permissions
                    .map(permission => {
                    if (permission.action) {
                        return {
                            id: permission.action.id,
                            name: permission.action.description,
                            permission_id: permission.id,
                            selected: false,
                        };
                    }
                    return null;
                })
                    .filter(action => action !== null);
                return {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    actions: actions,
                };
            });
        };
    }
    async findAll(role_id) {
        const list = await this.functionalityRepository.find({
            relations: ['permissions', 'permissions.action'],
            order: {
                id: 'ASC',
            },
        });
        const functionalitiesWithActions = this.convertToPermissionDto(list);
        if (role_id) {
            const queryRunner = this.functionalityRepository.manager.connection.createQueryRunner();
            await queryRunner.connect();
            try {
                const rolePermissions = await queryRunner.manager.query(`SELECT permission_id FROM role_permission WHERE role_id = $1`, [role_id]);
                const permissionIds = rolePermissions.map(item => item.permission_id);
                if (permissionIds.length > 0) {
                    functionalitiesWithActions.forEach(functionality => {
                        functionality.actions.forEach(action => {
                            if (permissionIds.includes(action.permission_id)) {
                                action.selected = true;
                            }
                        });
                    });
                }
            }
            finally {
                await queryRunner.release();
            }
        }
        return functionalitiesWithActions;
    }
};
exports.FunctionalitiesService = FunctionalitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(functionality_entity_1.Functionality)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FunctionalitiesService);
//# sourceMappingURL=functionalities.service.js.map