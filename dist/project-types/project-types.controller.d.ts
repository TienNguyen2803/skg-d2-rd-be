import { ProjectTypesService } from './project-types.service';
import { ProjectType } from './entities/project-type.entity';
export declare class ProjectTypesController {
    private readonly projectTypesService;
    constructor(projectTypesService: ProjectTypesService);
    findAll(page: number, limit: number, filterQuery?: string, sort?: string): Promise<Readonly<{
        data: ProjectType[];
        total: number;
    }>>;
}
