
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
} from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { UserRole } from './entities/user-role.entity';
import { RoleEnum } from 'src/roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('User Roles')
@Controller({
  path: 'user-roles',
  version: '1',
})
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

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

  @Get('user/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get roles for a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of roles for the specified user',
    type: [UserRole],
  })
  findUserRoles(@Param('userId', ParseIntPipe) userId: number) {
    return this.userRolesService.findUserRoles(userId);
  }

  @Delete(':userId/:roleId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove role from user' })
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
