"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSiteConfigurationTable1743678123456 = void 0;
class CreateSiteConfigurationTable1743678123456 {
    constructor() {
        this.name = 'CreateSiteConfigurationTable1743678123456';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "site_configuration" (
            "id" SERIAL NOT NULL, 
            "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "deleted_at" TIMESTAMP, 
            "created_by" integer, 
            "updated_by" integer,
            "website_name" character varying,
            "slogan" character varying,
            "logo_path" character varying,
            "favicon_path" character varying,
            "email" character varying,
            "phone" character varying,
            "address" character varying,
            "facebook_url" character varying,
            "instagram_url" character varying,
            "copyright_text" character varying,
            "footer_logo_path" character varying,
            "is_active" boolean NOT NULL DEFAULT false,
            CONSTRAINT "PK_site_configuration_id" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "site_configuration"`);
    }
}
exports.CreateSiteConfigurationTable1743678123456 = CreateSiteConfigurationTable1743678123456;
//# sourceMappingURL=1743678123456-CreateSiteConfigurationTable.js.map