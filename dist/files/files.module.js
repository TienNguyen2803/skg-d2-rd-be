"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesModule = void 0;
const common_1 = require("@nestjs/common");
const files_controller_1 = require("./files.controller");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("@nestjs/config");
const multer_1 = require("multer");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_s3_1 = __importDefault(require("multer-s3"));
const typeorm_1 = require("@nestjs/typeorm");
const file_entity_1 = require("./entities/file.entity");
const files_service_1 = require("./files.service");
let FilesModule = exports.FilesModule = class FilesModule {
};
exports.FilesModule = FilesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([file_entity_1.FileEntity]),
            platform_express_1.MulterModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const storages = {
                        local: () => (0, multer_1.diskStorage)({
                            destination: './files',
                            filename: (request, file, callback) => {
                                var _a;
                                callback(null, `${(0, random_string_generator_util_1.randomStringGenerator)()}.${(_a = file.originalname
                                    .split('.')
                                    .pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase()}`);
                            },
                        }),
                        s3: () => {
                            const s3 = new client_s3_1.S3Client({
                                region: configService.get('file.awsS3Region', { infer: true }),
                                credentials: {
                                    accessKeyId: configService.getOrThrow('file.accessKeyId', {
                                        infer: true,
                                    }),
                                    secretAccessKey: configService.getOrThrow('file.secretAccessKey', { infer: true }),
                                },
                            });
                            return (0, multer_s3_1.default)({
                                s3: s3,
                                bucket: configService.getOrThrow('file.awsDefaultS3Bucket', {
                                    infer: true,
                                }),
                                acl: 'public-read',
                                contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
                                key: (request, file, callback) => {
                                    var _a;
                                    callback(null, `${(0, random_string_generator_util_1.randomStringGenerator)()}.${(_a = file.originalname
                                        .split('.')
                                        .pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase()}`);
                                },
                            });
                        },
                    };
                    return {
                        fileFilter: (request, file, callback) => {
                            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
                                return callback(new common_1.HttpException({
                                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                                    errors: {
                                        file: `cantUploadFileType`,
                                    },
                                }, common_1.HttpStatus.UNPROCESSABLE_ENTITY), false);
                            }
                            callback(null, true);
                        },
                        storage: storages[configService.getOrThrow('file.driver', { infer: true })](),
                        limits: {
                            fileSize: configService.get('file.maxFileSize', { infer: true }),
                        },
                    };
                },
            }),
        ],
        controllers: [files_controller_1.FilesController],
        providers: [config_1.ConfigModule, config_1.ConfigService, files_service_1.FilesService],
    })
], FilesModule);
//# sourceMappingURL=files.module.js.map