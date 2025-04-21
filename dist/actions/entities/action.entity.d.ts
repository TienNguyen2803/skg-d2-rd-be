import { EntityHelper } from '../../utils/entity-helper';
import { Permission } from '../../permissions/entities/permission.entity';
export declare class Action extends EntityHelper {
    id: number;
    name: string;
    description: string;
    permissions: Permission[];
}
