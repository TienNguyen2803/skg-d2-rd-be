import { EntityHelper } from '../../utils/entity-helper';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';
import { Timesheet } from 'src/timesheet/entities/timesheet.entity';
export declare class Department extends EntityHelper {
    id: number;
    name: string;
    code: string;
    description: string;
    users: User[];
    projects: Project[];
    timesheets: Timesheet[];
}
