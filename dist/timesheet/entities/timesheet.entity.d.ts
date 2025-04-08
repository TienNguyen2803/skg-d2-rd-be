import { EntityHelper } from '../../utils/entity-helper';
import { Project } from '../../projects/entities/project.entity';
import { Department } from '../../departments/entities/department.entity';
import { TimesheetStatus } from '../../timesheet-status/entities/timesheet-status.entity';
import { TimesheetDetail } from '../../timesheet-detail/entities/timesheet-detail.entity';
import { User } from '../../users/entities/user.entity';
export declare class Timesheet extends EntityHelper {
    creator: User;
    creator_id: number;
    id: number;
    month_year: string;
    total_hours: number;
    reject_reason: string;
    project: Project;
    project_id: number;
    department: Department;
    department_id: number;
    status: TimesheetStatus;
    status_id: number;
    details: TimesheetDetail[];
}
