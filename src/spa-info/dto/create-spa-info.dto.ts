
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, ValidateNested, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class CreateBannerDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  image_url: string;

  @ApiProperty({ example: 'Welcome Banner' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Discover our services' })
  @IsString()
  subtitle: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  order: number;

  @ApiProperty({ example: true })
  @IsOptional()
  is_active: boolean;

  @ApiProperty({ example: 0, description: '0 - home, 1 - about, 2 - contact' })
  @IsOptional()
  type: number;
}

class CreateWorkingHourDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ example: 'Monday' })
  @IsString()
  day_of_week: string;

  @ApiProperty({ example: '09:00' })
  @IsString()
  opening_time: string;

  @ApiProperty({ example: '18:00' })
  @IsString()
  closing_time: string;
}

export class CreateSpaInfoDto {
  @ApiProperty({ example: 'Luxury Spa' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://example.com/logo.png' })
  @IsString()
  logo_url: string;

  @ApiProperty({ example: '123 Spa Street' })
  @IsString()
  address: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'contact@luxuryspa.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Welcome to our luxury spa...' })
  @IsOptional()
  description: string;

  @ApiProperty({ example: 'Luxury Spa - Relaxation & Wellness' })
  @IsString()
  seo_title: string;

  @ApiProperty({ example: 'Experience ultimate relaxation...' })
  @IsString()
  seo_description: string;

  @ApiProperty({ example: 'https://facebook.com/luxuryspa' })
  @IsString()
  facebook_url: string;

  @ApiProperty({ example: 'https://instagram.com/luxuryspa' })
  @IsString()
  instagram_url: string;

  @ApiProperty({ type: [CreateBannerDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBannerDto)
  @IsOptional()
  banners?: CreateBannerDto[];

  @ApiProperty({ type: [CreateWorkingHourDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkingHourDto)
  @IsOptional()
  workingHours?: CreateWorkingHourDto[];
}
