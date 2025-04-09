
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  HttpCode,
  Param,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { CurrentUser } from '../decorators/user/current-user.decorator';

@ApiBearerAuth()
@Roles(RoleEnum.user, RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Timesheet')
@Controller({
  path: 'timesheets',
  version: '1',
})
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) { }

  @Post()
  create(@Body() createTimesheetDto: CreateTimesheetDto, @CurrentUser() user) {
    console.log('user', user)
    return this.timesheetService.create(createTimesheetDto, user.id);
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.timesheetService.findAll(user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.timesheetService.findOne(id);
  }
}
