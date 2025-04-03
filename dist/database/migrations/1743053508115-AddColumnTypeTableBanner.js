"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnTypeTableBanner1743053508115 = void 0;
class AddColumnTypeTableBanner1743053508115 {
    constructor() {
        this.name = 'AddColumnTypeTableBanner1743053508115';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "banner" ADD "type" integer NOT NULL DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "type"`);
    }
}
exports.AddColumnTypeTableBanner1743053508115 = AddColumnTypeTableBanner1743053508115;
//# sourceMappingURL=1743053508115-AddColumnTypeTableBanner.js.map