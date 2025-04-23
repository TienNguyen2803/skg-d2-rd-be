"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserRolesTable1746000000000 = void 0;
class CreateUserRolesTable1746000000000 {
    constructor() {
        this.name = 'CreateUserRolesTable1746000000000';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE "user_roles" (
        "user_id" integer NOT NULL,
        "role_id" integer NOT NULL,
        CONSTRAINT "PK_88481b0c4ed9da063abb9743740" PRIMARY KEY ("user_id", "role_id")
      )
    `);
        await queryRunner.query(`
      ALTER TABLE "user_roles" ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" 
      FOREIGN KEY ("user_id") REFERENCES "user"("id") 
      ON DELETE CASCADE ON UPDATE CASCADE
    `);
        await queryRunner.query(`
      ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" 
      FOREIGN KEY ("role_id") REFERENCES "role"("id") 
      ON DELETE CASCADE ON UPDATE CASCADE
    `);
        await queryRunner.query(`
      ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "FK_c28e52f758e7bbc53828db92194"
    `);
        await queryRunner.query(`
      ALTER TABLE "user" DROP COLUMN IF EXISTS "roleId"
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "user" ADD COLUMN "roleId" integer
    `);
        await queryRunner.query(`
      ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" 
      FOREIGN KEY ("roleId") REFERENCES "role"("id") 
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
        await queryRunner.query(`
      ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"
    `);
        await queryRunner.query(`
      ALTER TABLE "user_roles" DROP CONSTRAINT "FK_472b25323af01488f1f66a06b67"
    `);
        await queryRunner.query(`
      DROP TABLE "user_roles"
    `);
    }
}
exports.CreateUserRolesTable1746000000000 = CreateUserRolesTable1746000000000;
//# sourceMappingURL=1746000000000-CreateUserRolesTable.js.map