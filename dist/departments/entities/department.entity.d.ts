import { EntityHelper } from '../../utils/entity-helper';
import { User } from '../../users/entities/user.entity';
export declare class Department extends EntityHelper {
    id: number;
    name: string;
    code: string;
    description: string;
    users: User[];
}
