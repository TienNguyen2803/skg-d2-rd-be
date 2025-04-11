
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

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
  @IsNotEmpty()
  password: string;

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
