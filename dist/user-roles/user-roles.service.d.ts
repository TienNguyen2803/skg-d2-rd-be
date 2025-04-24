import { Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
export declare class UserRolesService {
    private userRoleRepository;
    constructor(userRoleRepository: Repository<UserRole>);
    createUserRole(userId: number, roleId: number): Promise<UserRole>;
}
