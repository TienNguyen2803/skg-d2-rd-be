import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableDepartment1745898243142 implements MigrationInterface {
    name = 'UpdateTableDepartment1745898243142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" ADD "manager_id" integer`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "UQ_4ca0fbc25538965a90575dc4a81" UNIQUE ("manager_id")`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "FK_4ca0fbc25538965a90575dc4a81" FOREIGN KEY ("manager_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "FK_4ca0fbc25538965a90575dc4a81"`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "UQ_4ca0fbc25538965a90575dc4a81"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "manager_id"`);
    }

}
