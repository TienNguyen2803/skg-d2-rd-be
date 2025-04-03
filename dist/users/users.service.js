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
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const mail_service_1 = require("../mail/mail.service");
let UsersService = exports.UsersService = class UsersService {
    constructor(mailService, usersRepository) {
        this.mailService = mailService;
        this.usersRepository = usersRepository;
    }
    async create(createProfileDto, isAdmin) {
        const newUser = this.usersRepository.save(this.usersRepository.create(createProfileDto));
        if (isAdmin) {
            await this.mailService.userCreatedByAdmin({
                to: createProfileDto.email,
                initialPass: createProfileDto.password,
            });
        }
        return newUser;
    }
    findManyWithPagination(paginationOptions) {
        return this.usersRepository.find({
            skip: paginationOptions.offset,
            take: paginationOptions.limit,
        });
    }
    standardCount() {
        return this.usersRepository.count();
    }
    findOne(fields) {
        return this.usersRepository.findOne({
            where: fields,
        });
    }
    update(id, payload) {
        return this.usersRepository.save(this.usersRepository.create(Object.assign({ id }, payload)));
    }
    async softDelete(id) {
        await this.usersRepository.softDelete(id);
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [mail_service_1.MailService,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map