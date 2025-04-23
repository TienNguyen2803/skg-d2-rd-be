
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRolesTable1746000000000 implements MigrationInterface {
  name = 'CreateUserRolesTable1746000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tạo bảng user_roles
    await queryRunner.query(`
      CREATE TABLE "user_roles" (
        "user_id" integer NOT NULL,
        "role_id" integer NOT NULL,
        CONSTRAINT "PK_88481b0c4ed9da063abb9743740" PRIMARY KEY ("user_id", "role_id")
      )
    `);

    // Tạo foreign key cho user_id
    await queryRunner.query(`
      ALTER TABLE "user_roles" ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" 
      FOREIGN KEY ("user_id") REFERENCES "user"("id") 
      ON DELETE CASCADE ON UPDATE CASCADE
    `);

    // Tạo foreign key cho role_id
    await queryRunner.query(`
      ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" 
      FOREIGN KEY ("role_id") REFERENCES "role"("id") 
      ON DELETE CASCADE ON UPDATE CASCADE
    `);

    // Xóa cột roleId trong bảng user
    await queryRunner.query(`
      ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "FK_c28e52f758e7bbc53828db92194"
    `);
    
    await queryRunner.query(`
      ALTER TABLE "user" DROP COLUMN IF EXISTS "roleId"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Thêm lại cột roleId trong bảng user
    await queryRunner.query(`
      ALTER TABLE "user" ADD COLUMN "roleId" integer
    `);
    
    await queryRunner.query(`
      ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" 
      FOREIGN KEY ("roleId") REFERENCES "role"("id") 
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    // Xóa bảng user_roles
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
