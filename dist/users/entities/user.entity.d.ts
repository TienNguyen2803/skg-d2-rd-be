import { Role } from '../../roles/entities/role.entity';
import { Status } from '../../statuses/entities/status.entity';
import { EntityHelper } from 'src/utils/entity-helper';
export declare class User extends EntityHelper {
    id: number;
    email: string | null;
    password: string;
    previousPassword: string;
    loadPreviousPassword(): void;
    setPassword(): Promise<void>;
    provider: string;
    socialId: string | null;
    firstName: string | null;
    lastName: string | null;
    role?: Role | null;
    status?: Status;
    hash: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
