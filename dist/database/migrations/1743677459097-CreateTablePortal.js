"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTablePortal1743677459097 = void 0;
class CreateTablePortal1743677459097 {
    constructor() {
        this.name = 'CreateTablePortal1743677459097';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "portal" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "name" character varying, "icon" character varying, "description" character varying, CONSTRAINT "PK_725cd9381e64f6b19862e564137" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "portal"`);
    }
}
exports.CreateTablePortal1743677459097 = CreateTablePortal1743677459097;
//# sourceMappingURL=1743677459097-CreateTablePortal.js.map