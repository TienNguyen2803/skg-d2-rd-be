import { Repository } from 'typeorm';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { Timesheet } from './entities/timesheet.entity';
import { TimesheetStatus } from '../timesheet-status/entities/timesheet-status.entity';
import { Response } from 'express';
export declare class TimesheetService {
    private timesheetRepository;
    private timesheetStatusRepository;
    constructor(timesheetRepository: Repository<Timesheet>, timesheetStatusRepository: Repository<TimesheetStatus>);
    create(createTimesheetDto: CreateTimesheetDto, userId: number): Promise<Timesheet>;
    findAll(creatorId: number, isAdmin: boolean): Promise<Timesheet[]>;
    findOne(id: number): Promise<Timesheet>;
    updateStatus(id: number, status_code: string): Promise<Timesheet>;
    updateRejectReason(id: number, reject_reason: string): Promise<Timesheet>;
    remove(id: number): Promise<void>;
    calculateOvertimeHours(details: any[]): {
        weekdayBeforeHours: number;
        weekdayAfterHours: number;
        sundayBeforeHours: number;
        sundayAfterHours: number;
    };
    exportToExcel(res: Response, month_year: string): Promise<Response>;
}
