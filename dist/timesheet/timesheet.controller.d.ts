import { Response } from 'express';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetStatusDto } from './dto/update-timesheet-status.dto';
import { UpdateTimesheetRejectDto } from './dto/update-timesheet-reject.dto';
import { Timesheet } from './entities/timesheet.entity';
export declare class TimesheetController {
    private readonly timesheetService;
    constructor(timesheetService: TimesheetService);
    create(createTimesheetDto: CreateTimesheetDto, user: any): Promise<Timesheet>;
    findAll(page: number, limit: number, filterQuery?: string, sort?: string, user?: any): Promise<Readonly<{
        data: Timesheet[];
        total: number;
    }>>;
    findOne(id: number): Promise<Timesheet>;
    updateStatus(id: number, updateStatusDto: UpdateTimesheetStatusDto): Promise<Timesheet>;
    updateRejectReason(id: number, updateRejectDto: UpdateTimesheetRejectDto): Promise<Timesheet>;
    remove(id: number): Promise<void>;
    exportExcel(month_year: string, res: Response): Promise<Response>;
}
