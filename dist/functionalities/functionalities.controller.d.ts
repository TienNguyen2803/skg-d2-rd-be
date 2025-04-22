import { Functionality } from './entities/functionality.entity';
import { FunctionalitiesService } from './functionalities.service';
export declare class FunctionalitiesController {
    private readonly functionalitiesService;
    constructor(functionalitiesService: FunctionalitiesService);
    findAll(): Promise<Functionality[]>;
}
