import { EntityHelper } from '../../utils/entity-helper';
import { Timesheet } from '../../timesheet/entities/timesheet.entity';
export declare class TimesheetStatus extends EntityHelper {
    id: number;
    code: string;
    name: string;
    description: string;
    timesheets: Timesheet[];
}
