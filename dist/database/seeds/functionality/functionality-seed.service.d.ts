import { Functionality } from 'src/functionalities/entities/functionality.entity';
import { Repository } from 'typeorm';
export declare class FunctionalitySeedService {
    private repository;
    constructor(repository: Repository<Functionality>);
    run(): Promise<void>;
}
