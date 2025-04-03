import { EntityHelper } from '../../utils/entity-helper';
export declare class Service extends EntityHelper {
    id: number;
    category_id: number;
    name: string;
    description: string;
    image_url: string;
    price: number;
    duration_minutes: number;
    benefits: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    service_category: Service;
    service_category_id: number;
}
