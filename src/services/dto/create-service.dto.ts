
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Thai Massage' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Traditional Thai massage therapy' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'https://example.com/thai-massage.jpg' })
  @IsString()
  image_url: string;

  @ApiProperty({ example: 99.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 60 })
  @IsNumber()
  duration_minutes: number;

  @ApiProperty({ example: 'Relaxation, stress relief, muscle tension relief' })
  @IsString()
  benefits: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({ example: 1 })
  @IsNumber()
  service_category_id: number;
}
