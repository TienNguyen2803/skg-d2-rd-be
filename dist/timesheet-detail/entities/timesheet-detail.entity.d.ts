import { EntityHelper } from '../../utils/entity-helper';
import { Timesheet } from '../../timesheet/entities/timesheet.entity';
export declare class TimesheetDetail extends EntityHelper {
    id: number;
    date: Date;
    start_time: string;
    end_time: string;
    ot_hours: number;
    description: string;
    timesheet: Timesheet;
    timesheet_id: number;
}
