import { IPaginationOptions } from '../utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { Department } from 'src/departments/entities/department.entity';
import { User } from 'src/users/entities/user.entity';
export declare class ProjectsService {
    private projectRepository;
    private departmentRepository;
    private userRepository;
    constructor(projectRepository: Repository<Project>, departmentRepository: Repository<Department>, userRepository: Repository<User>);
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    findManyWithPagination({ page, limit, offset }: IPaginationOptions, filterQuery?: string, sort?: string): Promise<Project[]>;
    standardCount(filterQuery?: string): Promise<number>;
    findOne(id: number): Promise<Project>;
    update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project>;
    softDelete(id: number): Promise<void>;
}
