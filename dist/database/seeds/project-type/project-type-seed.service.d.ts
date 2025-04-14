import { ProjectType } from 'src/project-types/entities/project-type.entity';
import { Repository } from 'typeorm';
export declare class ProjectTypeSeedService {
    private repository;
    constructor(repository: Repository<ProjectType>);
    run(): Promise<void>;
}
