"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTableEmployeeType1746698325017 = void 0;
class UpdateTableEmployeeType1746698325017 {
    constructor() {
        this.name = 'UpdateTableEmployeeType1746698325017';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "employee_type" DROP COLUMN "resource_effort"`);
        await queryRunner.query(`ALTER TABLE "employee_type" ADD "resource_effort" double precision`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "employee_type" DROP COLUMN "resource_effort"`);
        await queryRunner.query(`ALTER TABLE "employee_type" ADD "resource_effort" integer NOT NULL`);
    }
}
exports.UpdateTableEmployeeType1746698325017 = UpdateTableEmployeeType1746698325017;
//# sourceMappingURL=1746698325017-UpdateTableEmployeeType.js.map