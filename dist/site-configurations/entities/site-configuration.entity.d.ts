import { EntityHelper } from '../../utils/entity-helper';
export declare class SiteConfiguration extends EntityHelper {
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
}
