"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectTypesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_type_entity_1 = require("./entities/project-type.entity");
const project_types_controller_1 = require("./project-types.controller");
const project_types_service_1 = require("./project-types.service");
let ProjectTypesModule = exports.ProjectTypesModule = class ProjectTypesModule {
};
exports.ProjectTypesModule = ProjectTypesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_type_entity_1.ProjectType])],
        controllers: [project_types_controller_1.ProjectTypesController],
        providers: [project_types_service_1.ProjectTypesService],
        exports: [project_types_service_1.ProjectTypesService],
    })
], ProjectTypesModule);
//# sourceMappingURL=project-types.module.js.map