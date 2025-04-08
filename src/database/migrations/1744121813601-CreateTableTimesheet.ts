import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTimesheet1744121813601 implements MigrationInterface {
    name = 'CreateTableTimesheet1744121813601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "timesheet_status" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "code" character varying, "name" character varying, "description" character varying, CONSTRAINT "PK_b6dc01ea8294ded6d6363aef1ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "timesheet_detail" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "date" TIMESTAMP, "start_time" character varying, "end_time" character varying, "ot_hours" integer, "description" character varying, "timesheet_id" integer, CONSTRAINT "PK_ea6f7f9ec31527e14a783a7cbe2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "timesheet" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "month_year" character varying, "total_hours" integer, "reject_reason" character varying, "project_id" integer, "department_id" integer, "status_id" integer, CONSTRAINT "PK_53c30fa094ae81f166955fb1036" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "timesheet_detail" ADD CONSTRAINT "FK_2b5e9174464779a604f1ef5a8a5" FOREIGN KEY ("timesheet_id") REFERENCES "timesheet"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "timesheet" ADD CONSTRAINT "FK_31efc1af34b3e429cf9bde584e2" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "timesheet" ADD CONSTRAINT "FK_163fe799cea679568841609a191" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "timesheet" ADD CONSTRAINT "FK_b6dc01ea8294ded6d6363aef1ed" FOREIGN KEY ("status_id") REFERENCES "timesheet_status"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timesheet" DROP CONSTRAINT "FK_b6dc01ea8294ded6d6363aef1ed"`);
        await queryRunner.query(`ALTER TABLE "timesheet" DROP CONSTRAINT "FK_163fe799cea679568841609a191"`);
        await queryRunner.query(`ALTER TABLE "timesheet" DROP CONSTRAINT "FK_31efc1af34b3e429cf9bde584e2"`);
        await queryRunner.query(`ALTER TABLE "timesheet_detail" DROP CONSTRAINT "FK_2b5e9174464779a604f1ef5a8a5"`);
        await queryRunner.query(`DROP TABLE "timesheet"`);
        await queryRunner.query(`DROP TABLE "timesheet_detail"`);
        await queryRunner.query(`DROP TABLE "timesheet_status"`);
    }

}
