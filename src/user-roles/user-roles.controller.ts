
import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { UserRole } from './entities/user-role.entity';
import { RoleEnum } from 'src/roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';
import { CreateUserRolesDto } from './dto/create-user-roles.dto';

// @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('User Roles')
@Controller({
  path: 'user-roles',
  version: '1',
})
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) { }

  @Post(':userId/:roleId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Assign role to user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Role has been successfully assigned to user.',
    type: UserRole,
  })
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ) {
    return this.userRolesService.createUserRole(userId, roleId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Assign multiple roles to users' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Roles have been successfully assigned to users.',
  })
  createUserRoles(@Body() createUserRolesDto: CreateUserRolesDto) {
    return this.userRolesService.createUserRoles(createUserRolesDto);
  }

  @Get('role/:roleId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users by role ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of users for the specified role',
    type: [UserRole],
  })
  findUsersByRoleId(@Param('roleId', ParseIntPipe) roleId: number) {
    return this.userRolesService.findUsersByRoleId(roleId);
  }

  @Delete(':userId/:roleId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove specific role from user' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Role has been successfully removed from user',
  })
  remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ) {
    return this.userRolesService.removeUserRole(userId, roleId);
  }

  @Delete('user/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove all roles from user' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'All roles have been successfully removed from user',
  })
  removeAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.userRolesService.removeAllUserRoles(userId);
  }
}
