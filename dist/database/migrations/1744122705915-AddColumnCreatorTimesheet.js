"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnCreatorTimesheet1744122705915 = void 0;
class AddColumnCreatorTimesheet1744122705915 {
    constructor() {
        this.name = 'AddColumnCreatorTimesheet1744122705915';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "timesheet" ADD "creator_id" integer`);
        await queryRunner.query(`ALTER TABLE "timesheet" ADD CONSTRAINT "FK_fc9810333dda7df620fecafa7d8" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "timesheet" DROP CONSTRAINT "FK_fc9810333dda7df620fecafa7d8"`);
        await queryRunner.query(`ALTER TABLE "timesheet" DROP COLUMN "creator_id"`);
    }
}
exports.AddColumnCreatorTimesheet1744122705915 = AddColumnCreatorTimesheet1744122705915;
//# sourceMappingURL=1744122705915-AddColumnCreatorTimesheet.js.map