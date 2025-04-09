
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTimesheetDetailDto {
  @ApiProperty({ example: '2024-04-09' })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: '09:00' })
  @IsString()
  @IsNotEmpty()
  start_time: string;

  @ApiProperty({ example: '17:00' })
  @IsNotEmpty()
  end_time: string;

  @ApiProperty({ example: 2 })
  @IsOptional()
  ot_hours: number;

  @ApiProperty({ example: 'Working on feature X' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  timesheet_id: number;
}
