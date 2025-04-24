import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableFunctionAction1745503872642 implements MigrationInterface {
    name = 'UpdateTableFunctionAction1745503872642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "functionality" ADD "resource" character varying`);
        await queryRunner.query(`ALTER TABLE "action" ADD "code" character varying(50)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "action" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "functionality" DROP COLUMN "resource"`);
    }

}
