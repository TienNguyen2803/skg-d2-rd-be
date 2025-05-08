"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmpoyeeType1746702539950 = void 0;
class UpdateEmpoyeeType1746702539950 {
    constructor() {
        this.name = 'UpdateEmpoyeeType1746702539950';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_cb7715437eef105142f2f37c82e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_cb7715437eef105142f2f37c82e"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_cb7715437eef105142f2f37c82e" FOREIGN KEY ("employee_type_id") REFERENCES "employee_type"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_cb7715437eef105142f2f37c82e"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_cb7715437eef105142f2f37c82e" UNIQUE ("employee_type_id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_cb7715437eef105142f2f37c82e" FOREIGN KEY ("employee_type_id") REFERENCES "employee_type"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }
}
exports.UpdateEmpoyeeType1746702539950 = UpdateEmpoyeeType1746702539950;
//# sourceMappingURL=1746702539950-UpdateEmpoyeeType.js.map