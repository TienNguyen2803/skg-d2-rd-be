import { EntityHelper } from 'src/utils/entity-helper';
import { RolePermission } from 'src/role-permissions/entities/role-permission.entity';
import { UserRole } from 'src/user-roles/entities/user-role.entity';
export declare class Role extends EntityHelper {
    id: number;
    name?: string;
    code?: string;
    description?: string;
    rolePermissions: RolePermission[];
    userRoles: UserRole[];
}
