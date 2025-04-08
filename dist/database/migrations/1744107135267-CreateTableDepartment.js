"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableDepartment1744107135267 = void 0;
class CreateTableDepartment1744107135267 {
    constructor() {
        this.name = 'CreateTableDepartment1744107135267';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "department" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "name" character varying, "code" character varying, "description" character varying, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "department_id" integer`);
        await queryRunner.query(`ALTER TABLE "site_configuration" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "site_configuration" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "site_configuration" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "site_configuration" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "site_configuration" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "site_configuration" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_afd2c87bee70dd5557f48911e66" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_afd2c87bee70dd5557f48911e66"`);
        await queryRunner.query(`ALTER TABLE "site_configuration" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "site_configuration" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "site_configuration" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "site_configuration" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "site_configuration" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "site_configuration" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "department_id"`);
        await queryRunner.query(`DROP TABLE "department"`);
    }
}
exports.CreateTableDepartment1744107135267 = CreateTableDepartment1744107135267;
//# sourceMappingURL=1744107135267-CreateTableDepartment.js.map