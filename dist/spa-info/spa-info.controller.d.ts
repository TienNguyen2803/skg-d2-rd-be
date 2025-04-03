import { UpdateSpaInfoDto } from './dto/update-spa-info.dto';
import { SpaInfoService } from './spa-info.service';
import { CreateSpaInfoDto } from './dto/create-spa-info.dto';
import { SpaInfo } from './entities/spa-info.entity';
export declare class SpaInfoController {
    private readonly spaInfoService;
    constructor(spaInfoService: SpaInfoService);
    create(createSpaInfoDto: CreateSpaInfoDto): Promise<SpaInfo>;
    findAll(page: number, limit: number, filterQuery?: string, sort?: string): Promise<Readonly<{
        data: SpaInfo[];
        total: number;
    }>>;
    findOne(id: number): Promise<SpaInfo>;
    update(id: number, updateSpaInfoDto: UpdateSpaInfoDto): Promise<SpaInfo>;
    remove(id: number): Promise<void>;
}
