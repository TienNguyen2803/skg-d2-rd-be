import { Permission } from 'src/permissions/entities/permission.entity';
import { Repository } from 'typeorm';
export declare class PermissionSeedService {
    private repository;
    constructor(repository: Repository<Permission>);
    run(): Promise<void>;
}
