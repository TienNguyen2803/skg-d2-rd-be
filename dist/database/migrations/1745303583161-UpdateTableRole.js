"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTableRole1745303583161 = void 0;
class UpdateTableRole1745303583161 {
    constructor() {
        this.name = 'UpdateTableRole1745303583161';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "role_permission" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "role_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_19a94c31d4960ded0dcd0397759" PRIMARY KEY ("role_id", "permission_id"))`);
        await queryRunner.query(`ALTER TABLE "role" ADD "code" character varying`);
        await queryRunner.query(`ALTER TABLE "role" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "code"`);
        await queryRunner.query(`DROP TABLE "role_permission"`);
    }
}
exports.UpdateTableRole1745303583161 = UpdateTableRole1745303583161;
//# sourceMappingURL=1745303583161-UpdateTableRole.js.map