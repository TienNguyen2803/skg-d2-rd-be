import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { ProjectType } from './entities/project-type.entity';
export declare class ProjectTypesService {
    private repository;
    constructor(repository: Repository<ProjectType>);
    findManyWithPagination({ page, limit, offset }: IPaginationOptions, filterQuery?: string, sort?: string): Promise<ProjectType[]>;
    standardCount(filterQuery?: string): Promise<number>;
}
