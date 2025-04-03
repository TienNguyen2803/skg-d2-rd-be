import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateSpaEntities1711020000000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
