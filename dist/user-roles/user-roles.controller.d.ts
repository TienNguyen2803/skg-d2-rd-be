import { UserRolesService } from './user-roles.service';
import { UserRole } from './entities/user-role.entity';
export declare class UserRolesController {
    private readonly userRolesService;
    constructor(userRolesService: UserRolesService);
    create(userId: number, roleId: number): Promise<UserRole>;
}
