"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBaseEntity1742996793964 = void 0;
class UpdateBaseEntity1742996793964 {
    constructor() {
        this.name = 'UpdateBaseEntity1742996793964';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "working_hour" DROP CONSTRAINT "FK_working_hour_spa_info"`);
        await queryRunner.query(`ALTER TABLE "banner" DROP CONSTRAINT "FK_banner_spa_info"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "updated_at" TIMESTAMP `);
        await queryRunner.query(`ALTER TABLE "role" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "role" ADD "created_by" integer`);
        await queryRunner.query(`ALTER TABLE "role" ADD "updated_by" integer`);
        await queryRunner.query(`ALTER TABLE "status" ADD "updated_at" TIMESTAMP `);
        await queryRunner.query(`ALTER TABLE "status" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "status" ADD "created_by" integer`);
        await queryRunner.query(`ALTER TABLE "status" ADD "updated_by" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP `);
        await queryRunner.query(`ALTER TABLE "user" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_by" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_by" integer`);
        await queryRunner.query(`ALTER TABLE "forgot" ADD "updated_at" TIMESTAMP `);
        await queryRunner.query(`ALTER TABLE "forgot" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "forgot" ADD "created_by" integer`);
        await queryRunner.query(`ALTER TABLE "forgot" ADD "updated_by" integer`);
        await queryRunner.query(`ALTER TABLE "session" ADD "updated_at" TIMESTAMP `);
        await queryRunner.query(`ALTER TABLE "session" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "session" ADD "created_by" integer`);
        await queryRunner.query(`ALTER TABLE "session" ADD "updated_by" integer`);
        await queryRunner.query(`ALTER TABLE "working_hour" ADD "updated_at" TIMESTAMP `);
        await queryRunner.query(`ALTER TABLE "working_hour" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "working_hour" ADD "created_by" integer`);
        await queryRunner.query(`ALTER TABLE "working_hour" ADD "updated_by" integer`);
        await queryRunner.query(`ALTER TABLE "working_hour" ADD "spaInfoId" integer`);
        await queryRunner.query(`ALTER TABLE "spa_info" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "spa_info" ADD "created_by" integer`);
        await queryRunner.query(`ALTER TABLE "spa_info" ADD "updated_by" integer`);
        await queryRunner.query(`ALTER TABLE "banner" ADD "updated_at" TIMESTAMP `);
        await queryRunner.query(`ALTER TABLE "banner" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "banner" ADD "created_by" integer`);
        await queryRunner.query(`ALTER TABLE "banner" ADD "updated_by" integer`);
        await queryRunner.query(`ALTER TABLE "banner" ADD "spaInfoId" integer`);
        await queryRunner.query(`ALTER TABLE "working_hour" ADD CONSTRAINT "FK_f7e37d526be8b1315279b43d607" FOREIGN KEY ("spaInfoId") REFERENCES "spa_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "banner" ADD CONSTRAINT "FK_ec9b6441bfc213aeb232923dc77" FOREIGN KEY ("spaInfoId") REFERENCES "spa_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "banner" DROP CONSTRAINT "FK_ec9b6441bfc213aeb232923dc77"`);
        await queryRunner.query(`ALTER TABLE "working_hour" DROP CONSTRAINT "FK_f7e37d526be8b1315279b43d607"`);
        await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "spaInfoId"`);
        await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "spa_info" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "spa_info" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "spa_info" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "working_hour" DROP COLUMN "spaInfoId"`);
        await queryRunner.query(`ALTER TABLE "working_hour" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "working_hour" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "working_hour" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "working_hour" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "forgot" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "forgot" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "forgot" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "forgot" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "banner" ADD CONSTRAINT "FK_banner_spa_info" FOREIGN KEY ("spa_info_id") REFERENCES "spa_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "working_hour" ADD CONSTRAINT "FK_working_hour_spa_info" FOREIGN KEY ("spa_info_id") REFERENCES "spa_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.UpdateBaseEntity1742996793964 = UpdateBaseEntity1742996793964;
//# sourceMappingURL=1742996793964-UpdateBaseEntity.js.map