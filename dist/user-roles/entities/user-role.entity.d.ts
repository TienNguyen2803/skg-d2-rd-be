import { EntityHelper } from '../../utils/entity-helper';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';
export declare class UserRole extends EntityHelper {
    user_id: number;
    role_id: number;
    user: User;
    role: Role;
}
