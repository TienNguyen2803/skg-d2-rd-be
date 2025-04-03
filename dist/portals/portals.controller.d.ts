import { PortalsService } from './portals.service';
import { CreatePortalDto } from './dto/create-portal.dto';
import { UpdatePortalDto } from './dto/update-portal.dto';
import { Portal } from './entities/portal.entity';
export declare class PortalsController {
    private readonly portalsService;
    constructor(portalsService: PortalsService);
    create(createPortalDto: CreatePortalDto): Promise<Portal>;
    findAll(page: number, limit: number, filterQuery?: string, sort?: string): Promise<Readonly<{
        data: Portal[];
        total: number;
    }>>;
    findOne(id: number): Promise<Portal>;
    update(id: number, updatePortalDto: UpdatePortalDto): Promise<Portal>;
    remove(id: number): Promise<void>;
}
