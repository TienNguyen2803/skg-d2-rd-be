import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    email?: string;
    firstName?: string;
    lastName?: string;
    short_name?: string;
    password?: string;
    department_id?: number;
    role_id?: number;
    status_id?: number;
}
export {};
