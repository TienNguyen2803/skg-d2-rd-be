import { TimesheetStatus } from 'src/timesheet-status/entities/timesheet-status.entity';
import { Repository } from 'typeorm';
export declare class TimesheetStatusSeedService {
    private repository;
    constructor(repository: Repository<TimesheetStatus>);
    run(): Promise<void>;
}
