import { BaseEntity } from 'typeorm';
export declare class EntityHelper extends BaseEntity {
    __entity?: string;
    updated_at: Date;
    created_at: Date;
    deleted_at: Date;
    created_by: number;
    updated_by: number;
    setEntityName(): void;
    toJSON(): Record<string, any>;
}
