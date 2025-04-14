import { EntityHelper } from '../../utils/entity-helper';
import { Project } from '../../projects/entities/project.entity';
export declare class ProjectType extends EntityHelper {
    id: number;
    code: string;
    name: string;
    description: string;
    projects: Project[];
}
