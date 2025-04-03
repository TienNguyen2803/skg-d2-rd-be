import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class Articles1691769417263 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
