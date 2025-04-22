
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested, IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class RolePermissionItem {
  @ApiProperty({ example: 4, description: 'Role ID' })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 1, description: 'Permission ID' })
  @IsNumber()
  @IsNotEmpty()
  permission_id: number;
}

export class CreateRolePermissionDto {
  @ApiProperty({ example: 4, description: 'Role ID' })
  @IsNumber()
  @IsNotEmpty()
  role_id: number;
  
  @ApiProperty({ 
    type: [RolePermissionItem],
    description: 'List of role permissions to create' 
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RolePermissionItem)
  rolePermissions: RolePermissionItem[];
}
