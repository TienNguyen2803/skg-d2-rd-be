import { EntityHelper } from '../../utils/entity-helper';
import { Permission } from '../../permissions/entities/permission.entity';
export declare class Functionality extends EntityHelper {
    id: number;
    name: string;
    description: string;
    resource: string;
    permissions: Permission[];
}
