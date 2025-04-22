import { RolePermissionsService } from './role-permissions.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
export declare class RolePermissionsController {
    private readonly rolePermissionsService;
    constructor(rolePermissionsService: RolePermissionsService);
    create(createRolePermissionDto: CreateRolePermissionDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
