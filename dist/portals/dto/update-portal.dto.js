"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePortalDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_portal_dto_1 = require("./create-portal.dto");
class UpdatePortalDto extends (0, swagger_1.PartialType)(create_portal_dto_1.CreatePortalDto) {
}
exports.UpdatePortalDto = UpdatePortalDto;
//# sourceMappingURL=update-portal.dto.js.map