import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetStatusDto } from './dto/update-timesheet-status.dto';
export declare class TimesheetController {
    private readonly timesheetService;
    constructor(timesheetService: TimesheetService);
    create(createTimesheetDto: CreateTimesheetDto, user: any): Promise<import("./entities/timesheet.entity").Timesheet>;
    findAll(user: any): Promise<import("./entities/timesheet.entity").Timesheet[]>;
    findOne(id: number): Promise<import("./entities/timesheet.entity").Timesheet>;
    updateStatus(id: number, updateStatusDto: UpdateTimesheetStatusDto): Promise<import("./entities/timesheet.entity").Timesheet>;
}
