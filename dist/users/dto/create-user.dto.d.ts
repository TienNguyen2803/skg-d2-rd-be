import { Status } from '../../statuses/entities/status.entity';
export declare class CreateUserDto {
    email: string | null;
    password?: string;
    firstName: string | null;
    lastName: string | null;
    status_id?: Status;
    department_id?: number;
    employee_type_id?: number;
}
