"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveColumnDescription1743232912786 = void 0;
class RemoveColumnDescription1743232912786 {
    constructor() {
        this.name = 'RemoveColumnDescription1743232912786';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "spa_info" DROP COLUMN "description"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "spa_info" ADD "description" text NOT NULL`);
    }
}
exports.RemoveColumnDescription1743232912786 = RemoveColumnDescription1743232912786;
//# sourceMappingURL=1743232912786-RemoveColumnDescription.js.map