import { EntityHelper } from '../../utils/entity-helper';
import { Banner } from '../../banners/entities/banner.entity';
import { WorkingHour } from '../../working-hours/entities/working-hour.entity';
export declare class SpaInfo extends EntityHelper {
    id: number;
    name: string;
    logo_url: string;
    address: string;
    phone: string;
    email: string;
    seo_title: string;
    seo_description: string;
    facebook_url: string;
    instagram_url: string;
    banners: Banner[];
    workingHours: WorkingHour[];
}
