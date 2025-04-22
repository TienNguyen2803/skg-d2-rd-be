
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permission } from './entities/permission.entity';
import { PermissionsService } from './permissions.service';

@ApiTags('Permissions')
@Controller({
  path: 'permissions',
  version: '1',
})
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get permissions list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get permissions list',
    type: [Permission],
  })
  async findAll() {
    return await this.permissionsService.findAll();
  }
}
