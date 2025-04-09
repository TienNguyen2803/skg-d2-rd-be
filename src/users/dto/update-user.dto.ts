import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'test@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;
}