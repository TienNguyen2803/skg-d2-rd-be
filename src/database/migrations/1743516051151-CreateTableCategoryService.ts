import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableCategoryService1743516051151 implements MigrationInterface {
    name = 'CreateTableCategoryService1743516051151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "category_id" integer, "name" character varying, "description" text, "image_url" character varying, "price" numeric(10,2), "duration_minutes" integer, "benefits" text, "is_active" boolean DEFAULT true, "service_category_id" integer NOT NULL, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_category" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "name" character varying, "image_url" character varying, "description" text, "order" integer, "is_active" boolean DEFAULT true, CONSTRAINT "PK_9d513b39d251063f98f2a7b941d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_a52ed144010ffdd7d13bb40bb6b" FOREIGN KEY ("service_category_id") REFERENCES "service_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_a52ed144010ffdd7d13bb40bb6b"`);
        await queryRunner.query(`DROP TABLE "service_category"`);
        await queryRunner.query(`DROP TABLE "service"`);
    }

}
