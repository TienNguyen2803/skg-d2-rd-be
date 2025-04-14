import { CreateProjectDto } from './create-project.dto';
declare const UpdateProjectDto_base: import("@nestjs/common").Type<Partial<CreateProjectDto>>;
export declare class UpdateProjectDto extends UpdateProjectDto_base {
    name?: string;
    description?: string;
    department_id?: number;
    pm_user_id?: number;
    project_type_id?: number;
}
export {};
