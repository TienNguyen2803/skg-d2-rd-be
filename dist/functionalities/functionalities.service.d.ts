import { Repository } from 'typeorm';
import { Functionality } from './entities/functionality.entity';
export declare class FunctionalitiesService {
    private functionalityRepository;
    constructor(functionalityRepository: Repository<Functionality>);
    findAll(): Promise<Functionality[]>;
    convertToPermissionDto: (data: any) => any;
}
