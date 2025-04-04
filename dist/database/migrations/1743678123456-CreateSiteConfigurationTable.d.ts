import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateSiteConfigurationTable1743678123456 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
