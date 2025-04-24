
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UserRoleAssignment {
  @ApiProperty()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  role_id: number;
}

export class CreateUserRolesDto {
  @ApiProperty({ type: [UserRoleAssignment] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserRoleAssignment)
  user_role_assignments: UserRoleAssignment[];
}
