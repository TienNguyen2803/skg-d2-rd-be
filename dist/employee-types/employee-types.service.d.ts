import { Repository } from 'typeorm';
import { CreateEmployeeTypeDto } from './dto/create-employee-type.dto';
import { UpdateEmployeeTypeDto } from './dto/update-employee-type.dto';
import { EmployeeType } from './entities/employee-type.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
export declare class EmployeeTypesService {
    private employeeTypeRepository;
    constructor(employeeTypeRepository: Repository<EmployeeType>);
    create(createEmployeeTypeDto: CreateEmployeeTypeDto): Promise<EmployeeType>;
    findManyWithPagination({ page, limit, offset }: IPaginationOptions, search?: string): Promise<EmployeeType[]>;
    standardCount(search?: string): Promise<number>;
    findOne(id: number): Promise<EmployeeType>;
    update(id: number, updateEmployeeTypeDto: UpdateEmployeeTypeDto): Promise<EmployeeType>;
    softDelete(id: number): Promise<void>;
}
