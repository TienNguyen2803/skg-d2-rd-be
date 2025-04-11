import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateColumnShortnameUser1744383520146 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
