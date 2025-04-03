import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreatePortalDto } from './dto/create-portal.dto';
import { UpdatePortalDto } from './dto/update-portal.dto';
import { Portal } from './entities/portal.entity';
export declare class PortalsService {
    private portalRepository;
    constructor(portalRepository: Repository<Portal>);
    create(createPortalDto: CreatePortalDto): Promise<Portal>;
    findManyWithPagination({ page, limit, offset }: IPaginationOptions, filterQuery?: string, sort?: string): Promise<Portal[]>;
    standardCount(filterQuery?: string): Promise<number>;
    findOne(id: number): Promise<Portal>;
    update(id: number, updatePortalDto: UpdatePortalDto): Promise<Portal>;
    softDelete(id: number): Promise<void>;
}
