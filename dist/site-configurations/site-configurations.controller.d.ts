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
    }): Promise<{
        id: number;
        website_name: string;
        slogan: string;
        logo_path: string;
        favicon_path: string;
        email: string;
        phone: string;
        address: string;
        facebook_url: string;
        instagram_url: string;
        copyright_text: string;
        footer_logo_path: string;
        is_active: boolean;
        __entity?: string | undefined;
        updated_at: Date;
        created_at: Date;
        deleted_at: Date;
        created_by: number;
        updated_by: number;
    }>;
    findAll(page: number, limit: number, filterQuery?: string, sort?: string): Promise<Readonly<{
        data: import("./entities/site-configuration.entity").SiteConfiguration[];
        total: number;
    }>>;
    findOne(id: number): Promise<import("./entities/site-configuration.entity").SiteConfiguration>;
    update(id: number, updateSiteConfigurationDto: UpdateSiteConfigurationDto, files: {
        logo?: Express.Multer.File[];
        favicon?: Express.Multer.File[];
        footer_logo?: Express.Multer.File[];
    }): Promise<{
        id: number;
        website_name: string;
        slogan: string;
        logo_path: string;
        favicon_path: string;
        email: string;
        phone: string;
        address: string;
        facebook_url: string;
        instagram_url: string;
        copyright_text: string;
        footer_logo_path: string;
        is_active: boolean;
        __entity?: string | undefined;
        updated_at: Date;
        created_at: Date;
        deleted_at: Date;
        created_by: number;
        updated_by: number;
    }>;
    remove(id: number): Promise<void>;
}
