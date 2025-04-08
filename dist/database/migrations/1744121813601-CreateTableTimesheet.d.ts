import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateTableTimesheet1744121813601 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
