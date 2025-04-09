import { TimesheetDetailService } from './timesheet-detail.service';
import { UpdateTimesheetDetailDto } from './dto/update-timesheet-detail.dto';
export declare class TimesheetDetailController {
    private readonly timesheetDetailService;
    constructor(timesheetDetailService: TimesheetDetailService);
    findAll(page: number, limit: number, s: string): Promise<Readonly<{
        data: import("./entities/timesheet-detail.entity").TimesheetDetail[];
        total: number;
    }>>;
    findOne(id: number): Promise<import("./entities/timesheet-detail.entity").TimesheetDetail>;
    update(id: number, updateTimesheetDetailDto: UpdateTimesheetDetailDto): Promise<import("./entities/timesheet-detail.entity").TimesheetDetail>;
    remove(id: number): Promise<void>;
}
