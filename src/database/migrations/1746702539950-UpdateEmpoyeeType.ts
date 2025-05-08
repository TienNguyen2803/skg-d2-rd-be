import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEmpoyeeType1746702539950 implements MigrationInterface {
    name = 'UpdateEmpoyeeType1746702539950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_cb7715437eef105142f2f37c82e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_cb7715437eef105142f2f37c82e"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_cb7715437eef105142f2f37c82e" FOREIGN KEY ("employee_type_id") REFERENCES "employee_type"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_cb7715437eef105142f2f37c82e"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_cb7715437eef105142f2f37c82e" UNIQUE ("employee_type_id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_cb7715437eef105142f2f37c82e" FOREIGN KEY ("employee_type_id") REFERENCES "employee_type"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

}
