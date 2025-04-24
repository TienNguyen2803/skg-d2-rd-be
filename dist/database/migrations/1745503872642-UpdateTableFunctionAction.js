"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTableFunctionAction1745503872642 = void 0;
class UpdateTableFunctionAction1745503872642 {
    constructor() {
        this.name = 'UpdateTableFunctionAction1745503872642';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "functionality" ADD "resource" character varying`);
        await queryRunner.query(`ALTER TABLE "action" ADD "code" character varying(50)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "action" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "functionality" DROP COLUMN "resource"`);
    }
}
exports.UpdateTableFunctionAction1745503872642 = UpdateTableFunctionAction1745503872642;
//# sourceMappingURL=1745503872642-UpdateTableFunctionAction.js.map