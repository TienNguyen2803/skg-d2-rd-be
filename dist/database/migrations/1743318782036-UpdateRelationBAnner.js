"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRelationBAnner1743318782036 = void 0;
class UpdateRelationBAnner1743318782036 {
    constructor() {
        this.name = 'UpdateRelationBAnner1743318782036';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "banner" DROP CONSTRAINT "FK_0061d055402e156fffaabd9234a"`);
        await queryRunner.query(`ALTER TABLE "working_hour" DROP CONSTRAINT "FK_d29da47ecc9ee984499a66e621d"`);
        await queryRunner.query(`ALTER TABLE "banner" ADD CONSTRAINT "FK_0061d055402e156fffaabd9234a" FOREIGN KEY ("spa_info_id") REFERENCES "spa_info"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "working_hour" ADD CONSTRAINT "FK_d29da47ecc9ee984499a66e621d" FOREIGN KEY ("spa_info_id") REFERENCES "spa_info"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "working_hour" DROP CONSTRAINT "FK_d29da47ecc9ee984499a66e621d"`);
        await queryRunner.query(`ALTER TABLE "banner" DROP CONSTRAINT "FK_0061d055402e156fffaabd9234a"`);
        await queryRunner.query(`ALTER TABLE "working_hour" ADD CONSTRAINT "FK_d29da47ecc9ee984499a66e621d" FOREIGN KEY ("spa_info_id") REFERENCES "spa_info"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "banner" ADD CONSTRAINT "FK_0061d055402e156fffaabd9234a" FOREIGN KEY ("spa_info_id") REFERENCES "spa_info"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
exports.UpdateRelationBAnner1743318782036 = UpdateRelationBAnner1743318782036;
//# sourceMappingURL=1743318782036-UpdateRelationBAnner.js.map