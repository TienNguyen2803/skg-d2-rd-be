import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableProjectType1744636075220 implements MigrationInterface {
    name = 'CreateTableProjectType1744636075220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_type" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "code" character varying, "name" character varying, "description" character varying, CONSTRAINT "PK_2a06e25261f5e8eb431d3683931" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "project_type"`);
    }

}
