import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    findManyWithPagination({ page, limit, offset }: IPaginationOptions, search?: string): Promise<Role[]>;
    standardCount(search?: string): Promise<number>;
    findOne(id: number): Promise<Role>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role>;
    softDelete(id: number): Promise<void>;
}
