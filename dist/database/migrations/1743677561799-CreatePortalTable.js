"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePortalTable1743677561799 = void 0;
class CreatePortalTable1743677561799 {
    constructor() {
        this.name = 'CreatePortalTable1743677561799';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "portal" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "name" character varying, "icon" character varying, "description" character varying, CONSTRAINT "PK_725cd9381e64f6b19862e564137" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "portal"`);
    }
}
exports.CreatePortalTable1743677561799 = CreatePortalTable1743677561799;
//# sourceMappingURL=1743677561799-CreatePortalTable.js.map