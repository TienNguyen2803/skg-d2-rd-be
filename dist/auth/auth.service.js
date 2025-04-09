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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const ms_1 = __importDefault(require("ms"));
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_providers_enum_1 = require("./auth-providers.enum");
const users_service_1 = require("../users/users.service");
const forgot_service_1 = require("../forgot/forgot.service");
const mail_service_1 = require("../mail/mail.service");
const config_1 = require("@nestjs/config");
const session_service_1 = require("../session/session.service");
let AuthService = exports.AuthService = class AuthService {
    constructor(jwtService, usersService, forgotService, sessionService, mailService, configService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.forgotService = forgotService;
        this.sessionService = sessionService;
        this.mailService = mailService;
        this.configService = configService;
    }
    async validateLogin(loginDto) {
        const user = await this.usersService.findOne(loginDto.email);
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    email: 'notFound',
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (user.provider !== auth_providers_enum_1.AuthProvidersEnum.email) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    email: `needLoginViaProvider:${user.provider}`,
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const isValidPassword = await bcryptjs_1.default.compare(loginDto.password, user.password);
        if (!isValidPassword) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    password: 'incorrectPassword',
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const session = await this.sessionService.create({
            user,
        });
        const { token, refreshToken, tokenExpires } = await this.getTokensData({
            id: user.id,
            role: user.role,
            sessionId: session.id,
        });
        return {
            refreshToken,
            token,
            tokenExpires,
            user,
        };
    }
    async getTokensData(data) {
        const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
            infer: true,
        });
        const tokenExpires = Date.now() + (0, ms_1.default)(tokenExpiresIn);
        const [token, refreshToken] = await Promise.all([
            await this.jwtService.signAsync({
                id: data.id,
                role: data.role,
                sessionId: data.sessionId,
            }, {
                secret: this.configService.getOrThrow('auth.secret', { infer: true }),
                expiresIn: tokenExpiresIn,
            }),
            await this.jwtService.signAsync({
                sessionId: data.sessionId,
            }, {
                secret: this.configService.getOrThrow('auth.refreshSecret', {
                    infer: true,
                }),
                expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
                    infer: true,
                }),
            }),
        ]);
        return {
            token,
            refreshToken,
            tokenExpires,
        };
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService,
        forgot_service_1.ForgotService,
        session_service_1.SessionService,
        mail_service_1.MailService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map