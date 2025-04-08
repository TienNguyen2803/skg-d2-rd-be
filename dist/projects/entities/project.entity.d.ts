import { EntityHelper } from '../../utils/entity-helper';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../departments/entities/department.entity';
export declare class Project extends EntityHelper {
    id: number;
    name: string;
    description: string;
    department: Department;
    department_id: number;
    project_manager: User;
    pm_user_id: number;
}
