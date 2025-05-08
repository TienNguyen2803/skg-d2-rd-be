"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeTypesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_type_entity_1 = require("./entities/employee-type.entity");
const employee_types_controller_1 = require("./employee-types.controller");
const employee_types_service_1 = require("./employee-types.service");
let EmployeeTypesModule = exports.EmployeeTypesModule = class EmployeeTypesModule {
};
exports.EmployeeTypesModule = EmployeeTypesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_type_entity_1.EmployeeType])],
        controllers: [employee_types_controller_1.EmployeeTypesController],
        providers: [employee_types_service_1.EmployeeTypesService],
        exports: [employee_types_service_1.EmployeeTypesService],
    })
], EmployeeTypesModule);
//# sourceMappingURL=employee-types.module.js.map