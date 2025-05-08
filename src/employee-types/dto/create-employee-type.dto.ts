
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateEmployeeTypeDto {
  @ApiProperty({ example: 'FULL_TIME' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'Full Time Employee' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  resource_effort: number;
}
