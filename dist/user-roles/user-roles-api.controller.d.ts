import { UserRolesService } from './user-roles.service';
import { CreateUserRolesDto } from './dto/create-user-roles.dto';
export declare class UserRolesApiController {
    private readonly userRolesService;
    constructor(userRolesService: UserRolesService);
    createUserRoles(createUserRolesDto: CreateUserRolesDto): Promise<{
        message: string;
    }>;
}
