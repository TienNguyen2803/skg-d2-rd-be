import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { User } from 'src/users/entities/user.entity';
export declare class DepartmentsService {
    private departmentRepository;
    private userRepository;
    constructor(departmentRepository: Repository<Department>, userRepository: Repository<User>);
    private validateManager;
    create(createDepartmentDto: CreateDepartmentDto): Promise<Department>;
    findManyWithPagination({ page, limit, offset }: IPaginationOptions, filterQuery?: string, sort?: string): Promise<Department[]>;
    standardCount(filterQuery?: string): Promise<number>;
    findOne(id: number): Promise<Department>;
    update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department>;
    softDelete(id: number): Promise<void>;
}
