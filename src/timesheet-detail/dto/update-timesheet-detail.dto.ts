
import { PartialType } from '@nestjs/swagger';
import { CreateTimesheetDetailDto } from './create-timesheet-detail.dto';

export class UpdateTimesheetDetailDto extends PartialType(CreateTimesheetDetailDto) {}
