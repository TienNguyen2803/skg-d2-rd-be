/// <reference types="node" />
import { Repository } from 'typeorm';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { Timesheet } from './entities/timesheet.entity';
import { TimesheetStatus } from '../timesheet-status/entities/timesheet-status.entity';
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
    exportToExcel(data: any[]): Promise<Buffer>;
}
