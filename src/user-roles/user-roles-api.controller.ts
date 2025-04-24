
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { UserRolesService } from './user-roles.service';
import { CreateUserRolesDto } from './dto/create-user-roles.dto';

@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('User Roles API')
@Controller('api/user_roles')
export class UserRolesApiController {
  constructor(private readonly userRolesService: UserRolesService) { }

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
}
