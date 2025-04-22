import { Repository } from 'typeorm';
import { RolePermission } from './entities/role-permission.entity';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { Role } from '../roles/entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
export declare class RolePermissionsService {
    private rolePermissionRepository;
    private roleRepository;
    private permissionRepository;
    constructor(rolePermissionRepository: Repository<RolePermission>, roleRepository: Repository<Role>, permissionRepository: Repository<Permission>);
    create(createRolePermissionDto: CreateRolePermissionDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
