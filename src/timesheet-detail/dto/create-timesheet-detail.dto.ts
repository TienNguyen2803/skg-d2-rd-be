
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTimesheetDetailDto {
  @ApiProperty({ example: '2024-04-09' })
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty({ example: '09:00' })
  @IsNotEmpty()
  @IsString()
  start_time: string;

  @ApiProperty({ example: '17:00' })
  @IsNotEmpty()
  @IsString()
  end_time: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsOptional()
  ot_hours: number;

  @ApiProperty({ example: 'Working on feature X' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  timesheet_id: number;
}
