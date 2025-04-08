import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnCreatorTimesheet1744122705915 implements MigrationInterface {
    name = 'AddColumnCreatorTimesheet1744122705915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timesheet" ADD "creator_id" integer`);
        await queryRunner.query(`ALTER TABLE "timesheet" ADD CONSTRAINT "FK_fc9810333dda7df620fecafa7d8" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timesheet" DROP CONSTRAINT "FK_fc9810333dda7df620fecafa7d8"`);
        await queryRunner.query(`ALTER TABLE "timesheet" DROP COLUMN "creator_id"`);
    }

}
