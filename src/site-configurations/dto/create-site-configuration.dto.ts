
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateSiteConfigurationDto {
  @ApiProperty({ example: 'My Website' })
  @IsString()
  @IsOptional()
  website_name?: string;

  @ApiProperty({ example: 'Best website ever' })
  @IsString()
  @IsOptional()
  slogan?: string;

  @ApiProperty({ example: '/path/to/logo.png' })
  @IsString()
  @IsOptional()
  logo_path?: string;

  @ApiProperty({ example: '/path/to/favicon.ico' })
  @IsString()
  @IsOptional()
  favicon_path?: string;

  @ApiProperty({ example: 'contact@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: '123 Main St' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 'https://facebook.com/mypage' })
  @IsString()
  @IsOptional()
  facebook_url?: string;

  @ApiProperty({ example: 'https://instagram.com/mypage' })
  @IsString()
  @IsOptional()
  instagram_url?: string;

  @ApiProperty({ example: '© 2025 My Company' })
  @IsString()
  @IsOptional()
  copyright_text?: string;

  @ApiProperty({ example: '/path/to/footer-logo.png' })
  @IsString()
  @IsOptional()
  footer_logo_path?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
