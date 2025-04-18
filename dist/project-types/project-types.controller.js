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
exports.ProjectTypesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const project_types_service_1 = require("./project-types.service");
const project_type_entity_1 = require("./entities/project-type.entity");
const standard_pagination_1 = require("../utils/standard-pagination");
let ProjectTypesController = exports.ProjectTypesController = class ProjectTypesController {
    constructor(projectTypesService) {
        this.projectTypesService = projectTypesService;
    }
    async findAll(page, limit, filterQuery, sort) {
        return (0, standard_pagination_1.standardPagination)(await this.projectTypesService.findManyWithPagination({
            page,
            limit,
            offset: (page - 1) * limit,
        }, filterQuery, sort), await this.projectTypesService.standardCount(filterQuery));
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get projects types list' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Get projects types list',
        type: [project_type_entity_1.ProjectType],
    }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('s')),
    __param(3, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], ProjectTypesController.prototype, "findAll", null);
exports.ProjectTypesController = ProjectTypesController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Project Types'),
    (0, common_1.Controller)({
        path: 'project-types',
        version: '1',
    }),
    __metadata("design:paramtypes", [project_types_service_1.ProjectTypesService])
], ProjectTypesController);
//# sourceMappingURL=project-types.controller.js.map