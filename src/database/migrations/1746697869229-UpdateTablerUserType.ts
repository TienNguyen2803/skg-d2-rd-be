import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTablerUserType1746697869229 implements MigrationInterface {
    name = 'UpdateTablerUserType1746697869229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employee_type" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "resource_effort" integer NOT NULL, CONSTRAINT "UQ_644e47bafc82380ff7aa11c55a7" UNIQUE ("code"), CONSTRAINT "PK_f9d58855715d2ef972426e8bfef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "employee_type_id" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_cb7715437eef105142f2f37c82e" UNIQUE ("employee_type_id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_cb7715437eef105142f2f37c82e" FOREIGN KEY ("employee_type_id") REFERENCES "employee_type"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_cb7715437eef105142f2f37c82e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_cb7715437eef105142f2f37c82e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "employee_type_id"`);
        await queryRunner.query(`DROP TABLE "employee_type"`);
    }

}
