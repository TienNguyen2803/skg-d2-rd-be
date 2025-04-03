import { EntityHelper } from '../../utils/entity-helper';
import { SpaInfo } from '../../spa-info/entities/spa-info.entity';
export declare class WorkingHour extends EntityHelper {
    id: number;
    day_of_week: string;
    opening_time: string;
    closing_time: string;
    is_closed: boolean;
    spa_info: SpaInfo;
    spa_info_id: number;
}
