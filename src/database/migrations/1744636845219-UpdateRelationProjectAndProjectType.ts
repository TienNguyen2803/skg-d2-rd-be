import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationProjectAndProjectType1744636845219 implements MigrationInterface {
    name = 'UpdateRelationProjectAndProjectType1744636845219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "project_type_id" integer`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_34f1046cd13a54a29735b8fa258" FOREIGN KEY ("project_type_id") REFERENCES "project_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_34f1046cd13a54a29735b8fa258"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "project_type_id"`);
    }

}
