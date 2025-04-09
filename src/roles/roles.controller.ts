
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from './entities/role.entity';
import { standardPagination } from '../utils/standard-pagination';

@ApiTags('Roles')
@Controller({
  path: 'roles',
  version: '1',
})
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new role' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Role has been successfully created.',
    type: Role,
  })
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get role list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get role list',
    type: [Role],
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('s') search?: string,
  ) {
    return standardPagination(
      await this.rolesService.findManyWithPagination({
        page,
        limit,
        offset: (page - 1) * limit,
      }, search),
      await this.rolesService.standardCount(search),
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get role by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get role by id',
    type: Role,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update role' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Role has been successfully updated',
    type: Role,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete role' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Role has been successfully deleted',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.softDelete(id);
  }
}
