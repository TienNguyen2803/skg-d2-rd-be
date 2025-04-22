
import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolePermissionsService } from './role-permissions.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';

@ApiTags('Role Permissions')
@Controller({
  path: 'role-permissions',
  version: '1',
})
export class RolePermissionsController {
  constructor(private readonly rolePermissionsService: RolePermissionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create role permissions' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Role permissions have been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Role or permission not found.',
  })
  async create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
    return this.rolePermissionsService.create(createRolePermissionDto);
  }
}
