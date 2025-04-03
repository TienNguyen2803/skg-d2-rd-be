import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePortal1743677459097 implements MigrationInterface {
    name = 'CreateTablePortal1743677459097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "portal" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "name" character varying, "icon" character varying, "description" character varying, CONSTRAINT "PK_725cd9381e64f6b19862e564137" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "portal"`);
    }

}
