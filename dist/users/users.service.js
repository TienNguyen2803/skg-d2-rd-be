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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const filter_builder_1 = require("../utils/filter-builder");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = exports.UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }
    async findManyWithPagination({ page, limit, offset }, filterQuery, sort) {
        const findOptions = Object.assign(Object.assign({}, filter_builder_1.FilterBuilder.buildFilter(filterQuery)), { skip: offset, take: limit, relations: ['department', 'role', 'status'], order: {} });
        if (sort) {
            const [field, direction] = sort.split(',');
            if (field && direction) {
                const upperDirection = direction.toUpperCase();
                if (upperDirection === 'ASC' || upperDirection === 'DESC') {
                    findOptions.order = { [field]: upperDirection };
                }
            }
        }
        else {
            findOptions.order = { id: 'DESC' };
        }
        return this.userRepository.find(findOptions);
    }
    standardCount(filterQuery) {
        const findOptions = filter_builder_1.FilterBuilder.buildFilter(filterQuery);
        return this.userRepository.count(findOptions);
    }
    async findOne(email) {
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['department', 'role', 'status'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${email} not found`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        Object.assign(user, updateUserDto);
        await this.userRepository.save(user);
        return this.userRepository.findOneOrFail({
            where: { id },
            relations: ['department', 'role', 'status'],
        });
    }
    async softDelete(id) {
        await this.userRepository.softDelete(id);
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map