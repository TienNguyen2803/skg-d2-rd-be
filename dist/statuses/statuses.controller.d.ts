import { StatusesService } from './statuses.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';
export declare class StatusesController {
    private readonly statusesService;
    constructor(statusesService: StatusesService);
    create(createStatusDto: CreateStatusDto): Promise<Status>;
    findAll(page: number, limit: number, search?: string): Promise<Readonly<{
        data: Status[];
        total: number;
    }>>;
    findOne(id: number): Promise<Status>;
    update(id: number, updateStatusDto: UpdateStatusDto): Promise<Status>;
    remove(id: number): Promise<void>;
}
