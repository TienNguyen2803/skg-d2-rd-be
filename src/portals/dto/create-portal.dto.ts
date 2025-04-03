
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePortalDto {
  @ApiProperty({ example: 'Main Portal' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'https://example.com/icon.png' })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({ example: 'Main portal description' })
  @IsString()
  @IsOptional()
  description?: string;
}
