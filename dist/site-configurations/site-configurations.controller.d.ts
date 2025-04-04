/// <reference types="multer" />
import { SiteConfigurationsService } from './site-configurations.service';
import { CreateSiteConfigurationDto } from './dto/create-site-configuration.dto';
import { UpdateSiteConfigurationDto } from './dto/update-site-configuration.dto';
export declare class SiteConfigurationsController {
    private readonly siteConfigurationsService;
    constructor(siteConfigurationsService: SiteConfigurationsService);
    create(createSiteConfigurationDto: CreateSiteConfigurationDto, files: {
        logo?: Express.Multer.File[];
        favicon?: Express.Multer.File[];
        footer_logo?: Express.Multer.File[];
    }): Promise<import("./entities/site-configuration.entity").SiteConfiguration>;
    findAll(page: number, limit: number, filterQuery?: string, sort?: string): Promise<Readonly<{
        data: import("./entities/site-configuration.entity").SiteConfiguration[];
        total: number;
    }>>;
    findOne(id: number): Promise<import("./entities/site-configuration.entity").SiteConfiguration>;
    update(id: number, updateSiteConfigurationDto: UpdateSiteConfigurationDto, files: {
        logo?: Express.Multer.File[];
        favicon?: Express.Multer.File[];
        footer_logo?: Express.Multer.File[];
    }): Promise<import("./entities/site-configuration.entity").SiteConfiguration>;
    remove(id: number): Promise<void>;
}
