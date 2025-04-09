import { Repository } from 'typeorm';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
export declare class StatusesService {
    private statusRepository;
    constructor(statusRepository: Repository<Status>);
    create(createStatusDto: CreateStatusDto): Promise<Status>;
    findManyWithPagination({ page, limit, offset }: IPaginationOptions, search?: string): Promise<Status[]>;
    standardCount(search?: string): Promise<number>;
    findOne(id: number): Promise<Status>;
    update(id: number, updateStatusDto: UpdateStatusDto): Promise<Status>;
    softDelete(id: number): Promise<void>;
}
