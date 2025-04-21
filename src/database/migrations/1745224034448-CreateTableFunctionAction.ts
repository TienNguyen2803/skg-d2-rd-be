import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableFunctionAction1745224034448 implements MigrationInterface {
    name = 'CreateTableFunctionAction1745224034448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "functionality" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" integer NOT NULL, "name" character varying(100), "description" character varying, CONSTRAINT "PK_95a4f9263c9b8d39dade8244fb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" integer NOT NULL, "functionality_id" integer NOT NULL, "action_id" integer NOT NULL, "name" character varying(150) NOT NULL, "description" character varying, CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE ("name"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "action" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" integer NOT NULL, "name" character varying(50), "description" character varying, CONSTRAINT "PK_2d9db9cf5edfbbae74eb56e3a39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_62f2bb45ebfa2604737e967c989" FOREIGN KEY ("functionality_id") REFERENCES "functionality"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_558a8b5ec76ab386a4c2e903f39" FOREIGN KEY ("action_id") REFERENCES "action"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_558a8b5ec76ab386a4c2e903f39"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_62f2bb45ebfa2604737e967c989"`);
        await queryRunner.query(`DROP TABLE "action"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "functionality"`);
    }

}
