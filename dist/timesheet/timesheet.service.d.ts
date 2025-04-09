import { Repository } from 'typeorm';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { Timesheet } from './entities/timesheet.entity';
import { TimesheetStatus } from '../timesheet-status/entities/timesheet-status.entity';
export declare class TimesheetService {
    private timesheetRepository;
    private timesheetStatusRepository;
    constructor(timesheetRepository: Repository<Timesheet>, timesheetStatusRepository: Repository<TimesheetStatus>);
    create(createTimesheetDto: CreateTimesheetDto, userId: number): Promise<Timesheet>;
    findAll(creatorId: number): Promise<Timesheet[]>;
    findOne(id: number): Promise<Timesheet>;
}
