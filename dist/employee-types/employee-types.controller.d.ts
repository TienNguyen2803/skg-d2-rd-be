import { EmployeeTypesService } from './employee-types.service';
import { CreateEmployeeTypeDto } from './dto/create-employee-type.dto';
import { UpdateEmployeeTypeDto } from './dto/update-employee-type.dto';
import { EmployeeType } from './entities/employee-type.entity';
export declare class EmployeeTypesController {
    private readonly employeeTypesService;
    constructor(employeeTypesService: EmployeeTypesService);
    create(createEmployeeTypeDto: CreateEmployeeTypeDto): Promise<EmployeeType>;
    findAll(page: number, limit: number, search?: string): Promise<Readonly<{
        data: EmployeeType[];
        total: number;
    }>>;
    findOne(id: number): Promise<EmployeeType>;
    update(id: number, updateEmployeeTypeDto: UpdateEmployeeTypeDto): Promise<EmployeeType>;
    remove(id: number): Promise<void>;
}
