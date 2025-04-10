
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTimesheetStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status_code: string;
}
