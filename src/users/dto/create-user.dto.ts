import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
  IsArray,
} from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Status } from '../../statuses/entities/status.entity';
import { Department } from 'src/departments/entities/department.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @IsEmail()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty({ example: 1 })
  @IsOptional()
  status_id?: Status;

  @ApiProperty({ example: 1 })
  @IsOptional()
  department_id?: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  employee_type_id?: number;
}