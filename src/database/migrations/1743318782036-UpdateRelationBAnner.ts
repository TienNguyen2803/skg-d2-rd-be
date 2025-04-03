import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationBAnner1743318782036 implements MigrationInterface {
    name = 'UpdateRelationBAnner1743318782036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banner" DROP CONSTRAINT "FK_0061d055402e156fffaabd9234a"`);
        await queryRunner.query(`ALTER TABLE "working_hour" DROP CONSTRAINT "FK_d29da47ecc9ee984499a66e621d"`);
        await queryRunner.query(`ALTER TABLE "banner" ADD CONSTRAINT "FK_0061d055402e156fffaabd9234a" FOREIGN KEY ("spa_info_id") REFERENCES "spa_info"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "working_hour" ADD CONSTRAINT "FK_d29da47ecc9ee984499a66e621d" FOREIGN KEY ("spa_info_id") REFERENCES "spa_info"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "working_hour" DROP CONSTRAINT "FK_d29da47ecc9ee984499a66e621d"`);
        await queryRunner.query(`ALTER TABLE "banner" DROP CONSTRAINT "FK_0061d055402e156fffaabd9234a"`);
        await queryRunner.query(`ALTER TABLE "working_hour" ADD CONSTRAINT "FK_d29da47ecc9ee984499a66e621d" FOREIGN KEY ("spa_info_id") REFERENCES "spa_info"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "banner" ADD CONSTRAINT "FK_0061d055402e156fffaabd9234a" FOREIGN KEY ("spa_info_id") REFERENCES "spa_info"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
