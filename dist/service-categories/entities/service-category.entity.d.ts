import { EntityHelper } from '../../utils/entity-helper';
import { Service } from '../../services/entities/service.entity';
export declare class ServiceCategory extends EntityHelper {
    id: number;
    name: string;
    image_url: string;
    description: string;
    order: number;
    is_active: boolean;
    services: Service[];
}
