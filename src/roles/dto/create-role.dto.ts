
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'Admin' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'ADMIN', required: false })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({ example: 'Administrator role', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
