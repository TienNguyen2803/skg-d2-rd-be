import { Role } from '../../roles/entities/role.entity';
import { Status } from '../../statuses/entities/status.entity';
import { Department } from '../../departments/entities/department.entity';
import { Project } from '../../projects/entities/project.entity';
import { Timesheet } from '../../timesheet/entities/timesheet.entity';
import { EntityHelper } from 'src/utils/entity-helper';
export declare class User extends EntityHelper {
    id: number;
    email: string | null;
    password: string;
    previousPassword: string;
    loadPreviousPassword(): void;
    setPassword(): Promise<void>;
    provider: string;
    socialId: string | null;
    firstName: string | null;
    lastName: string | null;
    short_name: string | null;
    role?: Role | null;
    status?: Status;
    hash: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    department: Department;
    department_id: number;
    managed_projects: Project[];
    timesheets: Timesheet[];
}
