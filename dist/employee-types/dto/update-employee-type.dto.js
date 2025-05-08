"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeeTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_employee_type_dto_1 = require("./create-employee-type.dto");
class UpdateEmployeeTypeDto extends (0, swagger_1.PartialType)(create_employee_type_dto_1.CreateEmployeeTypeDto) {
}
exports.UpdateEmployeeTypeDto = UpdateEmployeeTypeDto;
//# sourceMappingURL=update-employee-type.dto.js.map