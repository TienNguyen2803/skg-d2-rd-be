"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTableDepartment1745898243142 = void 0;
class UpdateTableDepartment1745898243142 {
    constructor() {
        this.name = 'UpdateTableDepartment1745898243142';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "department" ADD "manager_id" integer`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "UQ_4ca0fbc25538965a90575dc4a81" UNIQUE ("manager_id")`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "FK_4ca0fbc25538965a90575dc4a81" FOREIGN KEY ("manager_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "FK_4ca0fbc25538965a90575dc4a81"`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "UQ_4ca0fbc25538965a90575dc4a81"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "manager_id"`);
    }
}
exports.UpdateTableDepartment1745898243142 = UpdateTableDepartment1745898243142;
//# sourceMappingURL=1745898243142-UpdateTableDepartment.js.map