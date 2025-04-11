"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateColumnShortnameUser1744383520146 = void 0;
class UpdateColumnShortnameUser1744383520146 {
    constructor() {
        this.name = 'UpdateColumnShortnameUser1744383520146';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "short_name" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "short_name"`);
    }
}
exports.UpdateColumnShortnameUser1744383520146 = UpdateColumnShortnameUser1744383520146;
//# sourceMappingURL=1744383520146-UpdateColumnShortnameUser.js.map