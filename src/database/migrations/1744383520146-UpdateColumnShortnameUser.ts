import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnShortnameUser1744383520146 implements MigrationInterface {
    name = 'UpdateColumnShortnameUser1744383520146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "short_name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "short_name"`);
    }

}
