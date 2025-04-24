import { Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
import { CreateUserRolesDto } from './dto/create-user-roles.dto';
export declare class UserRolesService {
    private userRoleRepository;
    constructor(userRoleRepository: Repository<UserRole>);
    createUserRole(userId: number, roleId: number): Promise<UserRole>;
    createUserRoles(createUserRolesDto: CreateUserRolesDto): Promise<{
        message: string;
    }>;
    findUserRoles(userId: number): Promise<UserRole[]>;
    findUsersByRoleId(roleId: number): Promise<UserRole[]>;
    removeUserRole(userId: number, roleId: number): Promise<void>;
    removeAllUserRoles(userId: number): Promise<void>;
}
