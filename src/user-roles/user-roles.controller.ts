
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
// @Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
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


}
