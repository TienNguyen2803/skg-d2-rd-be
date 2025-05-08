import { EmployeeType } from 'src/employee-types/entities/employee-type.entity';
import { Repository } from 'typeorm';
export declare class EmployeeTypeSeedService {
    private repository;
    constructor(repository: Repository<EmployeeType>);
    run(): Promise<void>;
}
