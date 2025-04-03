"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUrlColumnToPortal1743677989097 = void 0;
class AddUrlColumnToPortal1743677989097 {
    constructor() {
        this.name = 'AddUrlColumnToPortal1743677989097';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "portal" ADD "url" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "portal" DROP COLUMN "url"`);
    }
}
exports.AddUrlColumnToPortal1743677989097 = AddUrlColumnToPortal1743677989097;
//# sourceMappingURL=1743677989097-AddUrlColumnToPortal.js.map