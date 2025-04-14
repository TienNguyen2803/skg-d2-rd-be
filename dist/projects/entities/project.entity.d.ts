import { EntityHelper } from '../../utils/entity-helper';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../departments/entities/department.entity';
import { Timesheet } from 'src/timesheet/entities/timesheet.entity';
import { ProjectType } from '../../project-types/entities/project-type.entity';
export declare class Project extends EntityHelper {
    project_type: ProjectType;
    project_type_id: number;
    id: number;
    name: string;
    description: string;
    department: Department;
    department_id: number;
    project_manager: User;
    pm_user_id: number;
    timesheets: Timesheet[];
}
