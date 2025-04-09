"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_status_dto_1 = require("./create-status.dto");
class UpdateStatusDto extends (0, swagger_1.PartialType)(create_status_dto_1.CreateStatusDto) {
}
exports.UpdateStatusDto = UpdateStatusDto;
//# sourceMappingURL=update-status.dto.js.map