import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddUrlColumnToPortal1743677989097 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
