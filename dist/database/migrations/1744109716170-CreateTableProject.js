"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableProject1744109716170 = void 0;
class CreateTableProject1744109716170 {
    constructor() {
        this.name = 'CreateTableProject1744109716170';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "project" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "name" character varying, "description" character varying, "department_id" integer, "pm_user_id" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_3841f0702bb3021e8b88bc8915f" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_fcd5594fa890911ca277d6e0bff" FOREIGN KEY ("pm_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_fcd5594fa890911ca277d6e0bff"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_3841f0702bb3021e8b88bc8915f"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }
}
exports.CreateTableProject1744109716170 = CreateTableProject1744109716170;
//# sourceMappingURL=1744109716170-CreateTableProject.js.map