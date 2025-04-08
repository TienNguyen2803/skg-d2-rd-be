
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({ example: 'IT Department' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'IT' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({ example: 'Information Technology Department' })
  @IsString()
  @IsOptional()
  description?: string;
}
