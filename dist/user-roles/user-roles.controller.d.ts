import { UserRolesService } from './user-roles.service';
import { UserRole } from './entities/user-role.entity';
import { CreateUserRolesDto } from './dto/create-user-roles.dto';
export declare class UserRolesController {
    private readonly userRolesService;
    constructor(userRolesService: UserRolesService);
    createUserRoles(createUserRolesDto: CreateUserRolesDto): Promise<{
        message: string;
    }>;
    findUsersByRoleId(roleId: number): Promise<UserRole[]>;
    remove(user_id: number, role_id: number): Promise<void>;
}
