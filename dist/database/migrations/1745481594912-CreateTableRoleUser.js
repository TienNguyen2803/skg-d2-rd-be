"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableRoleUser1745481594912 = void 0;
class CreateTableRoleUser1745481594912 {
    constructor() {
        this.name = 'CreateTableRoleUser1745481594912';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user_roles" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_23ed6f04fe43066df08379fd034" PRIMARY KEY ("user_id", "role_id"))`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
    }
}
exports.CreateTableRoleUser1745481594912 = CreateTableRoleUser1745481594912;
//# sourceMappingURL=1745481594912-CreateTableRoleUser.js.map