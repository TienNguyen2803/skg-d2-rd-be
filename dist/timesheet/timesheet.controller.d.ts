import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
export declare class TimesheetController {
    private readonly timesheetService;
    constructor(timesheetService: TimesheetService);
    create(createTimesheetDto: CreateTimesheetDto, user: any): Promise<import("./entities/timesheet.entity").Timesheet>;
    findAll(user: any): Promise<import("./entities/timesheet.entity").Timesheet[]>;
}
