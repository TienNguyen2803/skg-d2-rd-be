import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableTimesheet1744209833035 implements MigrationInterface {
    name = 'UpdateTableTimesheet1744209833035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timesheet_detail" DROP COLUMN "ot_hours"`);
        await queryRunner.query(`ALTER TABLE "timesheet_detail" ADD "ot_hours" double precision`);
        await queryRunner.query(`ALTER TABLE "timesheet" DROP COLUMN "total_hours"`);
        await queryRunner.query(`ALTER TABLE "timesheet" ADD "total_hours" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timesheet" DROP COLUMN "total_hours"`);
        await queryRunner.query(`ALTER TABLE "timesheet" ADD "total_hours" integer`);
        await queryRunner.query(`ALTER TABLE "timesheet_detail" DROP COLUMN "ot_hours"`);
        await queryRunner.query(`ALTER TABLE "timesheet_detail" ADD "ot_hours" integer`);
    }

}
