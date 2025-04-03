import { MigrationInterface, QueryRunner } from "typeorm";
export declare class RemoveColumnDescription1743232912786 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
