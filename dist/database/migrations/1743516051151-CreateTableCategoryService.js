"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableCategoryService1743516051151 = void 0;
class CreateTableCategoryService1743516051151 {
    constructor() {
        this.name = 'CreateTableCategoryService1743516051151';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "service" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "category_id" integer, "name" character varying, "description" text, "image_url" character varying, "price" numeric(10,2), "duration_minutes" integer, "benefits" text, "is_active" boolean DEFAULT true, "service_category_id" integer NOT NULL, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_category" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "id" SERIAL NOT NULL, "name" character varying, "image_url" character varying, "description" text, "order" integer, "is_active" boolean DEFAULT true, CONSTRAINT "PK_9d513b39d251063f98f2a7b941d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_a52ed144010ffdd7d13bb40bb6b" FOREIGN KEY ("service_category_id") REFERENCES "service_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_a52ed144010ffdd7d13bb40bb6b"`);
        await queryRunner.query(`DROP TABLE "service_category"`);
        await queryRunner.query(`DROP TABLE "service"`);
    }
}
exports.CreateTableCategoryService1743516051151 = CreateTableCategoryService1743516051151;
//# sourceMappingURL=1743516051151-CreateTableCategoryService.js.map