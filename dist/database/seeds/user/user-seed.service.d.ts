import { Role } from 'src/roles/entities/role.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserSeedService {
    private repository;
    private roleRepository;
    private statusRepository;
    constructor(repository: Repository<User>, roleRepository: Repository<Role>, statusRepository: Repository<Status>);
    run(): Promise<void>;
}
