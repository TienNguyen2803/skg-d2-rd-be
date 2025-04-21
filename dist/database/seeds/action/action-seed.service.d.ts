import { Action } from 'src/actions/entities/action.entity';
import { Repository } from 'typeorm';
export declare class ActionSeedService {
    private repository;
    constructor(repository: Repository<Action>);
    run(): Promise<void>;
}
