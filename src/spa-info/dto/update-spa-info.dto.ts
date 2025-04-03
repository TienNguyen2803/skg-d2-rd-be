
import { PartialType } from '@nestjs/swagger';
import { CreateSpaInfoDto } from './create-spa-info.dto';

export class UpdateSpaInfoDto extends PartialType(CreateSpaInfoDto) {}
