import { Response } from 'express';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetStatusDto } from './dto/update-timesheet-status.dto';
import { UpdateTimesheetRejectDto } from './dto/update-timesheet-reject.dto';
export declare class TimesheetController {
    private readonly timesheetService;
    constructor(timesheetService: TimesheetService);
    create(createTimesheetDto: CreateTimesheetDto, user: any): Promise<import("./entities/timesheet.entity").Timesheet>;
    findAll(user: any): Promise<import("./entities/timesheet.entity").Timesheet[]>;
    findOne(id: number): Promise<import("./entities/timesheet.entity").Timesheet>;
    updateStatus(id: number, updateStatusDto: UpdateTimesheetStatusDto): Promise<import("./entities/timesheet.entity").Timesheet>;
    updateRejectReason(id: number, updateRejectDto: UpdateTimesheetRejectDto): Promise<import("./entities/timesheet.entity").Timesheet>;
    exportExcel(res: Response): Promise<Response>;
}
