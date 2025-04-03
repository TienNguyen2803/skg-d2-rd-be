import { ServiceCategoriesService } from './service-categories.service';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ServiceCategory } from './entities/service-category.entity';
export declare class ServiceCategoriesController {
    private readonly serviceCategoriesService;
    constructor(serviceCategoriesService: ServiceCategoriesService);
    create(createServiceCategoryDto: CreateServiceCategoryDto): Promise<ServiceCategory>;
    findAll(page: number, limit: number, filterQuery?: string, sort?: string): Promise<Readonly<{
        data: ServiceCategory[];
        total: number;
    }>>;
    findOne(id: number): Promise<ServiceCategory>;
    update(id: number, updateServiceCategoryDto: UpdateServiceCategoryDto): Promise<ServiceCategory>;
    remove(id: number): Promise<void>;
}
