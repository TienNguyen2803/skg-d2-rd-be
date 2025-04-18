
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
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

  @ApiProperty({ example: 'John D', required: false })
  @IsString()
  @IsOptional()
  short_name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  department_id?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  role_id?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  status_id?: number;
}
