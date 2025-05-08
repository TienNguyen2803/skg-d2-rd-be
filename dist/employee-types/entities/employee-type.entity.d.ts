import { EntityHelper } from '../../utils/entity-helper';
import { User } from '../../users/entities/user.entity';
export declare class EmployeeType extends EntityHelper {
    id: number;
    code: string;
    name: string;
    resource_effort: number;
    user: User;
}
