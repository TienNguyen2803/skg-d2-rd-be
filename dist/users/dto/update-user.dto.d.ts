import { Status } from '../../statuses/entities/status.entity';
import { CreateUserDto } from './create-user.dto';
import { Department } from 'src/departments/entities/department.entity';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    email?: string | null;
    password?: string;
    firstName?: string | null;
    lastName?: string | null;
    roleIds?: number[];
    status?: Status;
    department_id?: number;
    department?: Department;
    employee_type_id?: number;
}
export {};
