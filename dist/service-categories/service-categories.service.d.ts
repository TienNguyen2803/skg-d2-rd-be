import { Repository } from 'typeorm';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ServiceCategory } from './entities/service-category.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
export declare class ServiceCategoriesService {
    private serviceCategoryRepository;
    constructor(serviceCategoryRepository: Repository<ServiceCategory>);
    create(createServiceCategoryDto: CreateServiceCategoryDto): Promise<ServiceCategory>;
    findManyWithPagination({ page, limit, offset }: IPaginationOptions, filterQuery?: string, sort?: string): Promise<ServiceCategory[]>;
    standardCount(filterQuery?: string): Promise<number>;
    findOne(id: number): Promise<ServiceCategory>;
    update(id: number, updateServiceCategoryDto: UpdateServiceCategoryDto): Promise<ServiceCategory>;
    softDelete(id: number): Promise<void>;
}
