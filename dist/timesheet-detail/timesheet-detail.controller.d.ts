import { TimesheetDetailService } from './timesheet-detail.service';
import { CreateTimesheetDetailDto } from './dto/create-timesheet-detail.dto';
import { UpdateTimesheetDetailDto } from './dto/update-timesheet-detail.dto';
import { TimesheetDetail } from './entities/timesheet-detail.entity';
export declare class TimesheetDetailController {
    private readonly timesheetDetailService;
    constructor(timesheetDetailService: TimesheetDetailService);
    create(createTimesheetDetailDto: CreateTimesheetDetailDto): Promise<TimesheetDetail>;
    findAll(page: number, limit: number, s: string): Promise<Readonly<{
        data: TimesheetDetail[];
        total: number;
    }>>;
    findOne(id: number): Promise<TimesheetDetail>;
    update(id: number, updateTimesheetDetailDto: UpdateTimesheetDetailDto): Promise<TimesheetDetail>;
    remove(id: number): Promise<void>;
}
