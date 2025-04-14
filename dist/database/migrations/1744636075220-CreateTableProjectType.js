"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableProjectType1744636075220 = void 0;
class CreateTableProjectType1744636075220 {
    constructor() {
        this.name = 'CreateTableProjectType1744636075220';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "project_type" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "code" character varying, "name" character varying, "description" character varying, CONSTRAINT "PK_2a06e25261f5e8eb431d3683931" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "project_type"`);
    }
}
exports.CreateTableProjectType1744636075220 = CreateTableProjectType1744636075220;
//# sourceMappingURL=1744636075220-CreateTableProjectType.js.map