
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateServiceCategoryDto {
  @ApiProperty({ example: 'Massage Services' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  image_url: string;

  @ApiProperty({ example: 'Various massage services...' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  order: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}
