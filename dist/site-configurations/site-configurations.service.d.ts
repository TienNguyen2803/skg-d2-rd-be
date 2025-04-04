import { Repository } from 'typeorm';
import { CreateSiteConfigurationDto } from './dto/create-site-configuration.dto';
import { UpdateSiteConfigurationDto } from './dto/update-site-configuration.dto';
import { SiteConfiguration } from './entities/site-configuration.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Response } from 'express';
export declare class SiteConfigurationsService {
    private siteConfigurationRepository;
    constructor(siteConfigurationRepository: Repository<SiteConfiguration>);
    create(createSiteConfigurationDto: CreateSiteConfigurationDto): Promise<SiteConfiguration>;
    findManyWithPagination({ page, limit, offset }: IPaginationOptions, filterQuery?: string, sort?: string): Promise<SiteConfiguration[]>;
    standardCount(filterQuery?: string): Promise<number>;
    findOne(id: number): Promise<SiteConfiguration>;
    update(id: number, updateSiteConfigurationDto: UpdateSiteConfigurationDto): Promise<SiteConfiguration>;
    softDelete(id: number): Promise<void>;
    getImage(filename: string, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
