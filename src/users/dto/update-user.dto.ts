import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength, IsArray } from 'class-validator';
import { Status } from '../../statuses/entities/status.entity';
import { CreateUserDto } from './create-user.dto';
import { Transform } from 'class-transformer';
import { Department } from 'src/departments/entities/department.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @ApiProperty()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiProperty({ example: 'John' })
  @IsOptional()
  firstName?: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  lastName?: string | null;

  @ApiProperty({ example: [1, 2], required: false, description: 'Array of role IDs' })
  @IsOptional()
  @IsArray()
  roleIds?: number[];

  @ApiProperty({ type: () => Status })
  @IsOptional()
  status?: Status;

  @ApiProperty({ example: 1 })
  @IsOptional()
  department_id?: number;

  @ApiProperty({ type: () => Department })
  @IsOptional()
  department?: Department;
}