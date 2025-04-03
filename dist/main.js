"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const app_module_1 = require("./app.module");
const validation_options_1 = __importDefault(require("./utils/validation-options"));
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
require("winston-daily-rotate-file");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
        logger: nest_winston_1.WinstonModule.createLogger({
            transports: [
                new winston_1.transports.DailyRotateFile({
                    filename: `logs/%DATE%-error.log`,
                    level: 'error',
                    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: false,
                    maxFiles: '30d',
                }),
                new winston_1.transports.DailyRotateFile({
                    filename: `logs/%DATE%-combined.log`,
                    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: false,
                    maxFiles: '30d',
                }),
                new winston_1.transports.Console({
                    format: winston_1.format.combine(winston_1.format.cli(), winston_1.format.splat(), winston_1.format.timestamp(), winston_1.format.printf((info) => {
                        return `${info.timestamp} ${info.level}: ${info.message}`;
                    })),
                }),
            ],
        }),
    });
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    const configService = app.get((config_1.ConfigService));
    app.enableShutdownHooks();
    app.setGlobalPrefix(configService.getOrThrow('app.apiPrefix', { infer: true }), {
        exclude: ['/'],
    });
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.useGlobalPipes(new common_1.ValidationPipe(validation_options_1.default));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('API')
        .setDescription('API docs')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
void bootstrap();
//# sourceMappingURL=main.js.map