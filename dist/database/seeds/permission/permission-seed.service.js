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
exports.PermissionSeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const permission_entity_1 = require("../../../permissions/entities/permission.entity");
const typeorm_2 = require("typeorm");
let PermissionSeedService = exports.PermissionSeedService = class PermissionSeedService {
    constructor(repository) {
        this.repository = repository;
    }
    async run() {
        const permissions = [
            { id: 1, functionality_id: 1, action_id: 1, name: 'timesheet.view' },
            { id: 2, functionality_id: 1, action_id: 2, name: 'timesheet.edit' },
            { id: 3, functionality_id: 1, action_id: 3, name: 'timesheet.delete' },
            { id: 4, functionality_id: 1, action_id: 4, name: 'timesheet.create' },
            { id: 5, functionality_id: 1, action_id: 5, name: 'timesheet.approve' },
            { id: 6, functionality_id: 1, action_id: 6, name: 'timesheet.reject' },
            { id: 7, functionality_id: 2, action_id: 1, name: 'project.view' },
            { id: 8, functionality_id: 2, action_id: 2, name: 'project.edit' },
            { id: 9, functionality_id: 2, action_id: 3, name: 'project.delete' },
            { id: 10, functionality_id: 2, action_id: 4, name: 'project.create' },
        ];
        for (const permission of permissions) {
            const exists = await this.repository.findOne({ where: { id: permission.id } });
            if (exists) {
                await this.repository.update(permission.id, permission);
            }
            else {
                await this.repository.save(this.repository.create(permission));
            }
        }
    }
};
exports.PermissionSeedService = PermissionSeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PermissionSeedService);
//# sourceMappingURL=permission-seed.service.js.map