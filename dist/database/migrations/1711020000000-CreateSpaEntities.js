"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSpaEntities1711020000000 = void 0;
class CreateSpaEntities1711020000000 {
    constructor() {
        this.name = 'CreateSpaEntities1711020000000';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE "spa_info" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "logo_url" character varying NOT NULL,
        "address" character varying NOT NULL,
        "phone" character varying NOT NULL,
        "email" character varying NOT NULL,
        "description" text NOT NULL,
        "seo_title" character varying NOT NULL,
        "seo_description" text NOT NULL,
        "facebook_url" character varying NOT NULL,
        "instagram_url" character varying NOT NULL,
        "updated_at" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_spa_info_id" PRIMARY KEY ("id")
      )`);
        await queryRunner.query(`
      CREATE TABLE "banner" (
        "id" SERIAL NOT NULL,
        "image_url" character varying NOT NULL,
        "title" character varying NOT NULL,
        "subtitle" character varying NOT NULL,
        "order" integer NOT NULL,
        "is_active" boolean NOT NULL,
        "spa_info_id" integer NOT NULL,
        CONSTRAINT "PK_banner_id" PRIMARY KEY ("id")
      )`);
        await queryRunner.query(`
      CREATE TABLE "working_hour" (
        "id" SERIAL NOT NULL,
        "day_of_week" character varying NOT NULL,
        "opening_time" TIME NOT NULL,
        "closing_time" TIME NOT NULL,
        "is_closed" boolean NOT NULL,
        "spa_info_id" integer NOT NULL,
        CONSTRAINT "PK_working_hour_id" PRIMARY KEY ("id")
      )`);
        await queryRunner.query(`
      ALTER TABLE "banner" ADD CONSTRAINT "FK_banner_spa_info" FOREIGN KEY ("spa_info_id") REFERENCES "spa_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
        await queryRunner.query(`
      ALTER TABLE "working_hour" ADD CONSTRAINT "FK_working_hour_spa_info" FOREIGN KEY ("spa_info_id") REFERENCES "spa_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "working_hour" DROP CONSTRAINT "FK_working_hour_spa_info"`);
        await queryRunner.query(`ALTER TABLE "banner" DROP CONSTRAINT "FK_banner_spa_info"`);
        await queryRunner.query(`DROP TABLE "working_hour"`);
        await queryRunner.query(`DROP TABLE "banner"`);
        await queryRunner.query(`DROP TABLE "spa_info"`);
    }
}
exports.CreateSpaEntities1711020000000 = CreateSpaEntities1711020000000;
//# sourceMappingURL=1711020000000-CreateSpaEntities.js.map