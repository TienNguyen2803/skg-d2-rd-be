
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTimesheetDto {
  @ApiProperty({ example: '2024-04' })
  @IsString()
  @IsNotEmpty()
  month_year: string;

  @ApiProperty({ example: 160 })
  @IsNumber()
  @IsOptional()
  total_hours?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  project_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  department_id: number;
}
