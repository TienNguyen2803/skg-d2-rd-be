"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTableTimesheet1744209833035 = void 0;
class UpdateTableTimesheet1744209833035 {
    constructor() {
        this.name = 'UpdateTableTimesheet1744209833035';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "timesheet_detail" DROP COLUMN "ot_hours"`);
        await queryRunner.query(`ALTER TABLE "timesheet_detail" ADD "ot_hours" double precision`);
        await queryRunner.query(`ALTER TABLE "timesheet" DROP COLUMN "total_hours"`);
        await queryRunner.query(`ALTER TABLE "timesheet" ADD "total_hours" double precision`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "timesheet" DROP COLUMN "total_hours"`);
        await queryRunner.query(`ALTER TABLE "timesheet" ADD "total_hours" integer`);
        await queryRunner.query(`ALTER TABLE "timesheet_detail" DROP COLUMN "ot_hours"`);
        await queryRunner.query(`ALTER TABLE "timesheet_detail" ADD "ot_hours" integer`);
    }
}
exports.UpdateTableTimesheet1744209833035 = UpdateTableTimesheet1744209833035;
//# sourceMappingURL=1744209833035-UpdateTableTimesheet.js.map