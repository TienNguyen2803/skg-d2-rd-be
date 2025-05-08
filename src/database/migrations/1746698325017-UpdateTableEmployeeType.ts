import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableEmployeeType1746698325017 implements MigrationInterface {
    name = 'UpdateTableEmployeeType1746698325017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_type" DROP COLUMN "resource_effort"`);
        await queryRunner.query(`ALTER TABLE "employee_type" ADD "resource_effort" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_type" DROP COLUMN "resource_effort"`);
        await queryRunner.query(`ALTER TABLE "employee_type" ADD "resource_effort" integer NOT NULL`);
    }

}
