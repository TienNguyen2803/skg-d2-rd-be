
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'Project A' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Project description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  department_id?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  pm_user_id?: number;
}
