import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveColumnDescription1743232912786 implements MigrationInterface {
    name = 'RemoveColumnDescription1743232912786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "spa_info" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "spa_info" ADD "description" text NOT NULL`);
    }

}
