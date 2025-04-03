import { EntityHelper } from '../../utils/entity-helper';
import { SpaInfo } from '../../spa-info/entities/spa-info.entity';
export declare class Banner extends EntityHelper {
    id: number;
    image_url: string;
    title: string;
    subtitle: string;
    order: number;
    is_active: boolean;
    type: number;
    spa_info: SpaInfo;
    spa_info_id: number;
}
