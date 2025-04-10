
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTimesheetRejectDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reject_reason: string;
}
