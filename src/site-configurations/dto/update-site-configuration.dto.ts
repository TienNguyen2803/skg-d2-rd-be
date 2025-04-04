
import { PartialType } from '@nestjs/swagger';
import { CreateSiteConfigurationDto } from './create-site-configuration.dto';

export class UpdateSiteConfigurationDto extends PartialType(CreateSiteConfigurationDto) {}
