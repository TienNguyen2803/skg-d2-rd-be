import { EntityHelper } from '../../utils/entity-helper';
import { Functionality } from '../../functionalities/entities/functionality.entity';
import { Action } from '../../actions/entities/action.entity';
export declare class Permission extends EntityHelper {
    id: number;
    functionality: Functionality;
    functionality_id: number;
    action: Action;
    action_id: number;
    name: string;
    description: string;
}
