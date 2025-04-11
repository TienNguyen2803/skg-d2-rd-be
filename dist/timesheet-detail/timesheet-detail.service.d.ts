import { Repository } from 'typeorm';
import { UpdateTimesheetDetailDto } from './dto/update-timesheet-detail.dto';
import { TimesheetDetail } from './entities/timesheet-detail.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { CreateTimesheetDetailDto } from './dto/create-timesheet-detail.dto';
import { Timesheet } from '../timesheet/entities/timesheet.entity';
export declare class TimesheetDetailService {
    private timesheetDetailRepository;
    private timesheetRepository;
    constructor(timesheetDetailRepository: Repository<TimesheetDetail>, timesheetRepository: Repository<Timesheet>);
    create(createTimesheetDetailDto: CreateTimesheetDetailDto): Promise<TimesheetDetail>;
    findAll(paginationOptions: IPaginationOptions, filterQuery?: string): Promise<Readonly<{
        data: TimesheetDetail[];
        total: number;
    }>>;
    findOne(id: number): Promise<TimesheetDetail>;
    update(id: number, updateTimesheetDetailDto: UpdateTimesheetDetailDto): Promise<TimesheetDetail>;
    remove(id: number): Promise<void>;
}
