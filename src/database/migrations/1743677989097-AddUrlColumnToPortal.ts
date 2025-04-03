
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUrlColumnToPortal1743677989097 implements MigrationInterface {
    name = 'AddUrlColumnToPortal1743677989097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portal" ADD "url" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portal" DROP COLUMN "url"`);
    }
}
