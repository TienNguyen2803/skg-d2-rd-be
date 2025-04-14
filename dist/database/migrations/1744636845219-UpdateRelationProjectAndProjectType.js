"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRelationProjectAndProjectType1744636845219 = void 0;
class UpdateRelationProjectAndProjectType1744636845219 {
    constructor() {
        this.name = 'UpdateRelationProjectAndProjectType1744636845219';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "project" ADD "project_type_id" integer`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_34f1046cd13a54a29735b8fa258" FOREIGN KEY ("project_type_id") REFERENCES "project_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_34f1046cd13a54a29735b8fa258"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "project_type_id"`);
    }
}
exports.UpdateRelationProjectAndProjectType1744636845219 = UpdateRelationProjectAndProjectType1744636845219;
//# sourceMappingURL=1744636845219-UpdateRelationProjectAndProjectType.js.map