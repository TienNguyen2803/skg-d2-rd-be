import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateUser1688161010537 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
