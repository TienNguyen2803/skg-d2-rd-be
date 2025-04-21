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
exports.FunctionalitySeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const functionality_entity_1 = require("../../../functionalities/entities/functionality.entity");
const typeorm_2 = require("typeorm");
let FunctionalitySeedService = exports.FunctionalitySeedService = class FunctionalitySeedService {
    constructor(repository) {
        this.repository = repository;
    }
    async run() {
        const functionalities = [
            { id: 1, name: 'Timesheet', description: "Bảng chấm công" },
            { id: 2, name: 'Project', description: "Quản lý dự án" },
        ];
        for (const functionality of functionalities) {
            const exists = await this.repository.findOne({ where: { id: functionality.id } });
            if (exists) {
                await this.repository.update(functionality.id, functionality);
            }
            else {
                await this.repository.save(this.repository.create(functionality));
            }
        }
    }
};
exports.FunctionalitySeedService = FunctionalitySeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(functionality_entity_1.Functionality)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FunctionalitySeedService);
//# sourceMappingURL=functionality-seed.service.js.map