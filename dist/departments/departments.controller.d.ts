import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    create(createDepartmentDto: CreateDepartmentDto): Promise<Department>;
    findAll(page: number, limit: number, filterQuery?: string, sort?: string): Promise<Readonly<{
        data: Department[];
        total: number;
    }>>;
    findOne(id: number): Promise<Department>;
    update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department>;
    remove(id: number): Promise<void>;
}
