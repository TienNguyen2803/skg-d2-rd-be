
import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({ example: 'Project A' })
  @IsString()
  @IsOptional()
  name?: string;

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

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  project_type_id?: number;
}
